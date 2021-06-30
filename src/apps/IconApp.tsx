import
    React, {
    useState
}                          from 'react';
import {
    jss as jssDefault,
}                          from 'react-jss'         // base technology of our nodestrap components
import './App.css';

import Container from '../libs/Container';
import BasicComponent   from '../libs/BasicComponent';
import Indicator from '../libs/Indicator';
import Content from '../libs/Content';
import Icon from '../libs/Icon';



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



function App() {
    const themes = [undefined,'primary','secondary','success','info','warning','danger','light','dark'];
    const [theme, 	   setTheme     ] = useState<string|undefined>('primary');

    const sizes = ['sm', undefined, 'lg'];
	const [size, 	   setSize      ] = useState<string|undefined>(undefined);

	const [enableGrad, setEnableGrad] = useState(false);
	const [outlined,   setOutlined  ] = useState(false);

	const milds = [false, undefined, true];
	const [mild,       setMild      ] = useState<boolean|undefined>(undefined);

	const [enabled,    setEnabled   ] = useState(true);

	

    return (
        <div className="App">
            <Container>
                <BasicComponent
					theme={theme} size={size} enableGradient={enableGrad}
					outlined={outlined} mild={mild}
				>
					element
					<Icon icon='face'               size={size} enableGradient={enableGrad} mild={mild} />
					<Icon icon='face' theme={theme} size={size} enableGradient={enableGrad} mild={mild} />
					<Icon icon='instagram' 				 size={size} enableGradient={enableGrad} mild={mild} />
					<Icon icon='instagram' theme={theme} size={size} enableGradient={enableGrad} mild={mild} />
                </BasicComponent>
                <Indicator
					theme={theme} size={size} enableGradient={enableGrad}
					outlined={outlined} mild={mild}

					enabled={enabled}
				>
					indicator
					<Icon icon='face'               size={size} enableGradient={enableGrad} mild={mild} />
					<Icon icon='face' theme={theme} size={size} enableGradient={enableGrad} mild={mild} />
					<Icon icon='instagram' 				 size={size} enableGradient={enableGrad} mild={mild} />
					<Icon icon='instagram' theme={theme} size={size} enableGradient={enableGrad} mild={mild} />
                </Indicator>
                <Indicator
					theme={theme} size={size} enableGradient={enableGrad}
					outlined={outlined} mild={mild}

					enabled={enabled} active={true}
				>
					indicator active
					<Icon icon='face'               size={size} enableGradient={enableGrad} mild={mild} />
					<Icon icon='face' theme={theme} size={size} enableGradient={enableGrad} mild={mild} />
					<Icon icon='instagram' 				 size={size} enableGradient={enableGrad} mild={mild} />
					<Icon icon='instagram' theme={theme} size={size} enableGradient={enableGrad} mild={mild} />
                </Indicator>
                <Content
					theme={theme} size={size} enableGradient={enableGrad}
					outlined={outlined} mild={mild}

					enabled={enabled}
				>
					content
					<Icon icon='face'               size={size} enableGradient={enableGrad} mild={mild} />
					<Icon icon='face' theme={theme} size={size} enableGradient={enableGrad} mild={mild} />
					<Icon icon='instagram' 				 size={size} enableGradient={enableGrad} mild={mild} />
					<Icon icon='instagram' theme={theme} size={size} enableGradient={enableGrad} mild={mild} />
                </Content>
				<Content
					theme={theme} size={size} enableGradient={enableGrad}
					outlined={outlined} mild={mild}

					enabled={enabled} active={true}
				>
					content active
					<Icon icon='face'               size={size} enableGradient={enableGrad} mild={mild} />
					<Icon icon='face' theme={theme} size={size} enableGradient={enableGrad} mild={mild} />
					<Icon icon='instagram' 				 size={size} enableGradient={enableGrad} mild={mild} />
					<Icon icon='instagram' theme={theme} size={size} enableGradient={enableGrad} mild={mild} />
                </Content>
				<Icon icon='face'               size={size} enableGradient={enableGrad} mild={mild} />
					<Icon icon='face' theme={theme} size={size} enableGradient={enableGrad} mild={mild} />
					<Icon icon='instagram' 				 size={size} enableGradient={enableGrad} mild={mild} />
					<Icon icon='instagram' theme={theme} size={size} enableGradient={enableGrad} mild={mild} />
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
					Mild:
					{
						milds.map(mi =>
							<label key={`${mi}`}>
								<input type='radio'
									value={`${mi}`}
									checked={mild===mi}
									onChange={(e) => setMild((() => {
										const value = e.target.value;
										if (!value) return undefined;
										switch (value) {
											case 'true' : return true;
											case 'false': return false;
											default     : return undefined;
										} // switch
									})())}
								/>
								{`${mi ?? 'unset'}`}
							</label>
						)
					}
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
            </Container>
        </div>
    );
}

export default App;
