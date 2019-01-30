import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Async from 'react-async';
import Wrapper from 'rsg-components/Wrapper';
import compileCode from '../../utils/compileCode';
import splitExampleCode from '../../utils/splitExampleCode';
import transpileImports from '../../utils/transpileImports';

/* eslint-disable react/no-multi-comp */

// Wrap everything in a React component to leverage the state management
// of this component
class StateHolder extends Component {
	static propTypes = {
		component: PropTypes.func.isRequired,
		initialState: PropTypes.object.isRequired,
	};

	state = this.props.initialState;
	setStateBinded = this.setState.bind(this);

	render() {
		// Return null when component doesn't render anything to avoid an error
		return this.props.component(this.state, this.setStateBinded) || null;
	}
}

export default class ReactExample extends Component {
	static propTypes = {
		code: PropTypes.string.isRequired,
		evalInContext: PropTypes.func.isRequired,
		onError: PropTypes.func.isRequired,
		compilerConfig: PropTypes.object,
	};
	static contextTypes = {};

	shouldComponentUpdate(nextProps) {
		return this.props.code !== nextProps.code;
	}

	// Eval the code to extract the value of the initial state
	getExampleInitialState(compiledCode) {
		if (compiledCode.indexOf('initialState') === -1) {
			return {};
		}

		return this.props.evalInContext(`
			var state = {}, initialState = {};
			try {
				${compiledCode};
			} catch (err) {}
			return initialState;
		`)();
	}

	// Run example code and return the last top-level expression
	getExampleComponent(compiledCode) {
		return this.props.evalInContext(`
			var initialState = {};
			${compiledCode}
		`);
	}

	render() {
		const { code, compilerConfig, onError } = this.props;
		const promiseFn = compileCode(code, compilerConfig, onError);

		return (
			<Wrapper onError={onError}>
				<Async promiseFn={promiseFn}>
					{({ data, isLoading }) => {
						if (isLoading) {
							return 'Loading.....';
						}

						const compiledCode = transpileImports(data);
						if (!compiledCode) {
							return null;
						}

						const { head, example } = splitExampleCode(compiledCode);
						const initialState = this.getExampleInitialState(head);
						const exampleComponent = this.getExampleComponent(example);

						return <StateHolder component={exampleComponent} initialState={initialState} />;
					}}
				</Async>
			</Wrapper>
		);
	}
}
