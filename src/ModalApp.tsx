import
    React, {
    useState
}                          from 'react';
import {
    jss as jssDefault,
}                          from 'react-jss'         // base technology of our nodestrap components
import logo from './logo.svg';
import './App.css';

import {
    Prop,
}                           from './libs/Css'        // ts defs support for jss

import Container from './libs/Container';
import Element   from './libs/Element';
import Indicator from './libs/Indicator';
import Content from './libs/Content';
import Button from './libs/Button';
import ButtonIcon from './libs/ButtonIcon';
import Modal, * as Modals from './libs/Modal';



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
	
	const modalStyles = [undefined, 'scrollable'];
	const [modalStyle,    setModalStyle     ] = useState<Modals.ModalStyle|undefined>(undefined);

	const aligns = [undefined, 'start', 'center', 'end'];
	const [horzAlign,  setHorzAlign   ] = useState<Prop.JustifyItems|undefined>(undefined);
	const [vertAlign,  setVertAlign   ] = useState<Prop.AlignItems|undefined>(undefined);

	const [wideContent, setWideContent   ] = useState(false);
	const [tallContent, setTallContent   ] = useState(false);

	

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
				<Button onClick={() => setActive(true)}>Show modal</Button>
				<ButtonIcon btnStyle='link' theme='secondary' aria-label='Close' icon='close' />
				<Modal theme={theme} size={size} enableGradient={enableGrad} outlined={outlined} enabled={enabled} active={active}

					header=
					'Lorem ipsum dolor'

					footer=
					'dolor sit amet'

					onClose={() => setActive(false)}

					modalStyle={modalStyle}
					horzAlign={horzAlign}
					vertAlign={vertAlign}
				>
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
						ModalStyle:
						{
							modalStyles.map(st =>
								<label key={st ?? ''}>
									<input type='radio'
										value={st}
										checked={modalStyle===st}
										onChange={(e) => setModalStyle((e.target.value || undefined) as (Modals.ModalStyle|undefined))}
									/>
									{`${st}`}
								</label>
							)
						}
					</p>
					<p>
						horzAlign:
						{
							aligns.map(al =>
								<label key={al ?? ''}>
									<input type='radio'
										value={al}
										checked={horzAlign===al}
										onChange={(e) => setHorzAlign((e.target.value || undefined) as (Prop.JustifyItems|undefined))}
									/>
									{`${al}`}
								</label>
							)
						}
					</p>
					<p>
						vertAlign:
						{
							aligns.map(al =>
								<label key={al ?? ''}>
									<input type='radio'
										value={al}
										checked={vertAlign===al}
										onChange={(e) => setVertAlign((e.target.value || undefined) as (Prop.AlignItems|undefined))}
									/>
									{`${al}`}
								</label>
							)
						}
					</p>
					<p>
						<label>
							<input type='checkbox'
								checked={wideContent}
								onChange={(e) => setWideContent(e.target.checked)}
							/>
							simulate wide content
						</label>
					</p>
					<p>
						<label>
							<input type='checkbox'
								checked={tallContent}
								onChange={(e) => setTallContent(e.target.checked)}
							/>
							simulate tall content
						</label>
					</p>
					{wideContent && <>
						<p style={{whiteSpace: 'nowrap'}}>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit qui provident vero at, veniam eligendi velit, culpa odit modi cumque fugit dicta facere asperiores autem iusto tenetur saepe, accusamus cum?
						</p>
					</>}
					{tallContent && <>
						<p>
							Lorem<br/>
							ipsum<br/>
							dolor<br/>
							sit,<br/>
							amet<br/>
							consectetur<br/>
							adipisicing<br/>
							elit.<br/>
							Obcaecati,<br/>
							fugiat<br/>
							quam<br/>
							corrupti<br/>
							doloremque<br/>
							mollitia<br/>
							fuga<br/>
							tempora<br/>
							sequi<br/>
							repellat?<br/>
							Sint<br/>
							quia<br/>
							doloremque,<br/>
							accusantium<br/>
							perferendis<br/>
							autem<br/>
							cupiditate!<br/>
							Sapiente<br/>
							odio<br/>
							sit<br/>
							voluptatem<br/>
							accusamus.
						</p>
					</>}
				</Modal>
                <hr style={{flexBasis: '100%'}} />
            </Container>
        </div>
    );
}

export default App;
