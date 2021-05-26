import
    React, {
    useState,
	useRef,
}                          from 'react';
import {
    jss as jssDefault,
}                          from 'react-jss'         // base technology of our nodestrap components
import logo from './logo.svg';
import './App.css';
import './NavscrollApp.css'

import Container from './libs/Container';
import Element   from './libs/Element';
import Indicator from './libs/Indicator';
import Content from './libs/Content';
import Navscroll, {NavscrollItem} from './libs/Navscroll';
import type * as Navscrolls from './libs/Navscroll';



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

	const actionCtrls = [false, undefined, true];
	const [actionCtrl,      setActionCtrl   ] = useState<boolean|undefined>(undefined);

	const orientations = [undefined, 'block', 'inline'];
	const [orientation,    setOrientation     ] = useState<Navscrolls.OrientationStyle|undefined>(undefined);

	const listStyles = [undefined, 'bullet'];
	const [listStyle,    setListStyle     ] = useState<Navscrolls.ListStyle|undefined>(undefined);


	const articleRef = useRef<HTMLElement>(null);
	

    return (
        <div className="App">
            <Container>
				<div style={{display: 'flex', flexDirection: 'row'}}>
					<Navscroll classes={['nav']} style={{flex: '1 1'}}
						theme={theme} size={size} enableGradient={enableGrad}
						outlined={outlined}

						enabled={enabled} active={active} actionCtrl={actionCtrl}
						orientation={orientation}
						listStyle={listStyle}

						targetRef={articleRef}
						targetFilter={(e) => e.tagName.toLowerCase() === 'section'}
						interpolation={false}
					>
						<>First heading</>
						<NavscrollItem>
							Second heading
							<Navscroll
								theme='success' size='sm' enableGradient={enableGrad}
								outlined={outlined}

								enabled={enabled} active={active}
							>
								<>Sub 2-1</>
								<>Sub 2-2</>
								<>Sub 2-3</>
								<>Sub 2-4</>
							</Navscroll>
						</NavscrollItem>
						<NavscrollItem theme='success'>Thrid heading</NavscrollItem>
						<NavscrollItem>Fourth heading</NavscrollItem>
						<NavscrollItem>Fifth heading</NavscrollItem>
						<NavscrollItem>Sixth heading</NavscrollItem>
						<NavscrollItem actionCtrl={true}>Seventh heading</NavscrollItem>
						<NavscrollItem>Last heading</NavscrollItem>
					</Navscroll>

					{/* <Navscroll classes={['nav']} style={{flex: '1 1'}}
						theme={theme} size={size} enableGradient={enableGrad}
						outlined={outlined}

						enabled={enabled} active={active}
						orientation={orientation}
						listStyle={listStyle}

						targetRef={articleRef}
						targetFilter={(e) => e.tagName.toLowerCase() === 'section'}
						interpolation={true}
					>
						<>First heading</>
						<NavscrollItem>
							Second heading
							<Navscroll
								theme='success' size='sm' enableGradient={enableGrad}
								outlined={outlined}

								enabled={enabled} active={active}
							>
								<>Sub 2-1</>
								<>Sub 2-2</>
								<>Sub 2-3</>
								<>Sub 2-4</>
							</Navscroll>
						</NavscrollItem>
						<NavscrollItem theme='success'>Thrid heading</NavscrollItem>
						<NavscrollItem>Fourth heading</NavscrollItem>
						<NavscrollItem>Fifth heading</NavscrollItem>
						<NavscrollItem>Sixth heading</NavscrollItem>
						<NavscrollItem actionCtrl={true}>Seventh heading</NavscrollItem>
						<NavscrollItem>Last heading</NavscrollItem>
					</Navscroll> */}
				</div>
				<article
					ref={articleRef}
					
					style={{
						height: '150px',
						width: '400px',
						border: 'solid 1px black',
						overflowY: 'auto',
						marginBlockStart: '20px',
						position: 'relative',
						padding: '8px',
						display: 'grid',
						gridAutoFlow: 'row',
						gap: '3px',
					}}
				>
					{/* <section></section> */}
					<section style={{ height: '50px' }}>
						<h6>First heading</h6>
					</section>
					<section style={{
							// height: 'auto',
							position: 'relative',

							height: '240px',
    						overflow: 'auto',
						}}>
						<h6>Second heading</h6>
						<section style={{ height: '200px' }}>
							Second sub heading 1
						</section>
						<section style={{ height: '100px' }}>
							Second sub heading 2
						</section>
						<section style={{ height: '160px' }}>
							Second sub heading 3
						</section>
						<section style={{ height: '50px' }}>
							Second sub heading 4
						</section>
					</section>
					<section style={{ height: '40px' }}>
						<h6>Thrid heading</h6>
					</section>
					<section style={{ height: '300px' }}>
						<h6>Fourth heading</h6>
					</section>
					<section style={{ height: '50px' }}>
						<h6>Fifth heading</h6>
					</section>
					<section style={{ height: '40px' }}>
						<h6>Sixth heading</h6>
					</section>
					<section style={{ height: '300px' }}>
						<h6>Seventh heading</h6>
					</section>
					<section style={{ height: '50px' }}>
						<h6>Last heading</h6>
					</section>
				</article>
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
				<p>
					actionCtrl:
					{
						actionCtrls.map(ac =>
							<label key={`${ac}`}>
								<input type='radio'
									value={`${ac}`}
									checked={actionCtrl===ac}
									onChange={(e) => setActionCtrl((() => {
										const value = e.target.value;
										if (!value) return undefined;
										switch (value) {
											case 'true' : return true;
											case 'false': return false;
											default     : return undefined;
										} // switch
									})())}
								/>
								{`${ac ?? 'unset'}`}
							</label>
						)
					}
				</p>
				<p>
					OrientationStyle:
					{
						orientations.map(ori =>
							<label key={ori ?? ''}>
								<input type='radio'
									value={ori}
									checked={orientation===ori}
									onChange={(e) => setOrientation((e.target.value || undefined) as (Navscrolls.OrientationStyle|undefined))}
								/>
								{`${ori}`}
							</label>
						)
					}
				</p>
				<p>
					ListStyle:
					{
						listStyles.map(st =>
							<label key={st ?? ''}>
								<input type='radio'
									value={st}
									checked={listStyle===st}
									onChange={(e) => setListStyle((e.target.value || undefined) as (Navscrolls.ListStyle|undefined))}
								/>
								{`${st}`}
							</label>
						)
					}
				</p>
            </Container>
        </div>
    );
}

export default App;
