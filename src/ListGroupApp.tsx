import
    React, {
    useState
}                          from 'react';
import {
    jss as jssDefault,
}                          from 'react-jss'         // base technology of our nodestrap components
import logo from './logo.svg';
import './App.css';

import Container from './libs/Container';
import Element   from './libs/Element';
import Indicator from './libs/Indicator';
import Content from './libs/Content';
import ListGroup, {ListGroupItem} from './libs/ListGroup';



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

	const [enabled,    setEnabled   ] = useState(true);
	const [active,      setActive   ] = useState(false);

	const [childEnabled,    setChildEnabled   ] = useState(false);
	const [childActive,      setChildActive   ] = useState(true);

	

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
                <Element
					theme={theme} size={size} enableGradient={enableGrad}
					outlined={outlined}
				>
                        test
                </Element>
                <Indicator
					theme={theme} size={size} enableGradient={enableGrad}
					outlined={outlined}

					enabled={enabled} active={active}
				>
                        test
                </Indicator>
                <Content
					theme={theme} size={size} enableGradient={enableGrad}
					outlined={outlined}

					enabled={enabled} active={active}
				>
                        test
                </Content>
				<ListGroup
					theme={theme} size={size} enableGradient={enableGrad}
					outlined={outlined}

					enabled={enabled} active={active}
				>
					<>hello</>
					<>holla</>
					<>hey</>
					<ListGroupItem enabled={childEnabled}>
						i'm {childEnabled ? 'enabled' : 'disabled'}
						<input type='checkbox'
							checked={childEnabled}
							onChange={(e) => setChildEnabled(e.target.checked)}
						/>
					</ListGroupItem>
					'hoho'
					<ListGroupItem active={childActive}>
						i'm {childActive ? 'active' : 'passive'}
						<input type='checkbox'
							checked={childActive}
							onChange={(e) => setChildActive(e.target.checked)}
						/>
					</ListGroupItem>
					<>hehe</>
					<ListGroupItem theme='danger'>i'm angry</ListGroupItem>
					<ListGroupItem theme='success'>i'm fine</ListGroupItem>
					<ListGroupItem size='sm'>i'm small</ListGroupItem>
					<ListGroupItem size='lg'>i'm big</ListGroupItem>
					<ListGroupItem enableGradient={true}>i'm 3d</ListGroupItem>
					<ListGroupItem outlined={true}>i'm transparent</ListGroupItem>
                </ListGroup>
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
            </Container>
        </div>
    );
}

export default App;
