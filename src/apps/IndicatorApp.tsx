import
    React, {
    useState
}                          from 'react';


import {
    JssStyle,
}                          from 'jss'
import {
    jss as jssDefault,
}                          from 'react-jss'         // base technology of our nodestrap components
import './App.css';

import Container 	from '../libs/Container';
import {
	IndicatorStyles,
	Indicator,
} 					from '../libs/Indicator';



// import jssPluginFunctions        from 'jss-plugin-rule-value-function'
// import jssPluginObservable       from 'jss-plugin-rule-value-observable'
// import jssPluginTemplate         from 'jss-plugin-template'
import jssPluginGlobal              from 'jss-plugin-global'
import jssPluginExtend              from 'jss-plugin-extend'
import jssPluginNested              from 'jss-plugin-nested'
// import jssPluginCompose          from 'jss-plugin-compose'
import jssPluginCamelCase           from 'jss-plugin-camel-case'
// import jssPluginDefaultUnit      from 'jss-plugin-default-unit'
import jssPluginExpand              from 'jss-plugin-expand'
// import jssPluginVendorPrefixer   from 'jss-plugin-vendor-prefixer'
// import jssPluginPropsSort        from 'jss-plugin-props-sort'

jssDefault.setup({plugins:[
	// jssPluginFunctions(),
	// jssPluginObservable({}),
	// jssPluginTemplate(),
	jssPluginGlobal(),
	jssPluginExtend(),
	jssPluginNested(),
	// jssPluginCompose(),
	jssPluginCamelCase(),
	// jssPluginDefaultUnit({}),
	jssPluginExpand(),
	// jssPluginVendorPrefixer(),
	// jssPluginPropsSort(),
	// jssPluginNormalizeShorthands(),
]});



class InheritIndicatorStyles extends IndicatorStyles {
	public /*override*/ useStates(inherit = true): JssStyle {
		return super.useStates(inherit);
	}
}
const inheritIndicatorStyles = new InheritIndicatorStyles();



function App() {
    const themes = [undefined,'primary','secondary','success','info','warning','danger','light','dark'];
    const [theme, 	   setTheme     ] = useState<string|undefined>('primary');

    const sizes = ['sm', undefined, 'lg'];
	const [size, 	   setSize      ] = useState<string|undefined>(undefined);

	const [enableGrad, setEnableGrad] = useState(false);
	const [outlined,   setOutlined  ] = useState(false);

	const [enabled,    setEnabled   ] = useState(true);
	const [active,      setActive   ] = useState(false);
	const [mild,       setMild      ] = useState(true);

	const [childEnabled,    setChildEnabled   ] = useState(true);
	const [childActive,      setChildActive   ] = useState(false);

	const styles = inheritIndicatorStyles.useStyles();



    return (
        <div className="App">
            <Container>
                <Indicator
					theme={theme} size={size} enableGradient={enableGrad}
					outlined={outlined} mild={mild}

					enabled={enabled} active={active}
				>
                    indicator

					<div style={{display: 'inline-block', background: 'white', border: 'solid 1px black', padding: '10px', margin: '15px'}}>
						<Indicator
							theme={theme} size={size} enableGradient={enableGrad}
							outlined={outlined}

							inheritEnabled={false}
							enabled={childEnabled}
							
							inheritActive={false}
							active={childActive}

							style={{display: 'inline-block'}}
						>
							independent
						</Indicator>

						<Indicator
							theme={theme} size={size} enableGradient={enableGrad}
							outlined={outlined}

							inheritEnabled={true}
							enabled={childEnabled}
							
							inheritActive={true}
							active={childActive}

							style={{display: 'inline-block'}}
						>
							inherit by prop
						</Indicator>

						<Indicator
							mainClass={styles.main}

							theme={theme} size={size} enableGradient={enableGrad}
							outlined={outlined}

							inheritEnabled={false}
							enabled={childEnabled}
							
							inheritActive={false}
							active={childActive}

							style={{display: 'inline-block'}}
						>
							inherit by css
						</Indicator>
					</div>
                </Indicator>

				<Indicator
					theme={theme} size={size} enableGradient={enableGrad}
					outlined={outlined} mild={mild}

					enabled={enabled} active={active}
				>
					generic indicator
				</Indicator>
				<Indicator
					tag='button'
					theme={theme} size={size} enableGradient={enableGrad}
					outlined={outlined} mild={mild}

					enabled={enabled} active={active}
				>
					control indicator
				</Indicator>
				<Indicator
					tag='input'
					{...{ type: 'checkbox' }}
					theme={theme} size={size} enableGradient={enableGrad}
					outlined={outlined} mild={mild}

					enabled={enabled} active={active}
				/>
                <hr style={{flexBasis: '100%'}} />
				<p>
					Theme:
					{
						themes.map(th =>
							<label key={th ?? ''}>
								<input type='radio'
									value={th}
									checked={theme===th}
									onChange={(e) => setTheme(e.target.value || undefined)}
								/>
								{`${th}`}
							</label>
						)
					}
				</p>
				<p>
					Size:
					{
						sizes.map(sz =>
							<label key={sz ?? ''}>
								<input type='radio'
									value={sz}
									checked={size===sz}
									onChange={(e) => setSize(e.target.value || undefined)}
								/>
								{`${sz}`}
							</label>
						)
					}
				</p>
				<p>
					<label>
						<input type='checkbox'
							checked={enableGrad}
							onChange={(e) => setEnableGrad(e.target.checked)}
						/>
						enable gradient
					</label>
				</p>
				<p>
					<label>
						<input type='checkbox'
							checked={outlined}
							onChange={(e) => setOutlined(e.target.checked)}
						/>
						outlined
					</label>
				</p>
				<p>
					<label>
						<input type='checkbox'
							checked={mild}
							onChange={(e) => setMild(e.target.checked)}
						/>
						mild
					</label>
				</p>
				<p>
					<label>
						<input type='checkbox'
							checked={enabled}
							onChange={(e) => setEnabled(e.target.checked)}
						/>
						enabled
					</label>
				</p>
				<p>
					<label>
						<input type='checkbox'
							checked={active}
							onChange={(e) => setActive(e.target.checked)}
						/>
						active
					</label>
				</p>
				<p>
					<label>
						<input type='checkbox'
							checked={childEnabled}
							onChange={(e) => setChildEnabled(e.target.checked)}
						/>
						child enabled
					</label>
				</p>
				<p>
					<label>
						<input type='checkbox'
							checked={childActive}
							onChange={(e) => setChildActive(e.target.checked)}
						/>
						child active
					</label>
				</p>
            </Container>
        </div>
    );
}

export default App;
