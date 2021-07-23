import
    React, {
    useState
}                          from 'react';
import {
    jss as jssDefault,
}                          from 'react-jss'         // base technology of our nodestrap components
import logo from './logo.svg';
import './App.css';

import Container from '../libs/Container';
import BasicComponent   from '../libs/BasicComponent';
// import Button from '../libs/Button';
// import ButtonIcon from '../libs/ButtonIcon';
import Carousel, { CarouselItem } from '../libs/Carousel';



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
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Edit <code>src/App.tsx</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
                <hr style={{flexBasis: '100%'}} />
                <BasicComponent
					theme={theme} size={size} gradient={enableGrad}
					outlined={outlined}
				>
                        test
                </BasicComponent>
				<Carousel theme={theme} size={size} gradient={enableGrad} outlined={outlined}
				>
					<CarouselItem><img src='https://picsum.photos/400/600' alt='' /></CarouselItem>
					<CarouselItem><img src='https://picsum.photos/600/400' alt='' /></CarouselItem>
					<CarouselItem><img src='https://picsum.photos/400/400' alt='' /></CarouselItem>
					<CarouselItem><img src='https://picsum.photos/600/600' alt='' /></CarouselItem>
				</Carousel>
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
