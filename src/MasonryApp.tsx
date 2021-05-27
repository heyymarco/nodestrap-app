import
    React, {
    useState
}                          from 'react';
import {
    jss as jssDefault,
}                          from 'react-jss'         // base technology of our nodestrap components
import './App.css';
import './MasonryApp.css';

import Container from './libs/Container';
import Masonry from './libs/Masonry';



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

	

    return (
        <div className="App">
            <Container>
                <Masonry
					theme={theme} size={size} enableGradient={enableGrad}
					outlined={outlined}
				>
					<img src="https://assets.codepen.io/12005/windmill.jpg" alt="A windmill" />
					<img src="https://assets.codepen.io/12005/suspension-bridge.jpg" alt="The Clifton Suspension Bridge" />
					<img src="https://assets.codepen.io/12005/sunset.jpg" alt="Sunset and boats" />
					<img src="https://assets.codepen.io/12005/snowy.jpg" alt="a river in the snow" />
					<img src="https://assets.codepen.io/12005/bristol-balloons1.jpg" alt="a single checked balloon" />
					<img src="https://assets.codepen.io/12005/dog-balloon.jpg" alt="a hot air balloon shaped like a dog" />
					<img src="https://assets.codepen.io/12005/abq-balloons.jpg" alt="View from a hot air balloon of other balloons" />
					<img src="https://assets.codepen.io/12005/disney-balloon.jpg" alt="a balloon fairground ride" />
					<img src="https://assets.codepen.io/12005/bristol-harbor.jpg" alt="sunrise over a harbor" />
					<img src="https://assets.codepen.io/12005/bristol-balloons2.jpg" alt="three hot air balloons in a blue sky" />
					<img src="https://assets.codepen.io/12005/toronto.jpg" alt="the Toronto light up sign at night" />
				</Masonry>
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
            </Container>
        </div>
    );
}

export default App;
