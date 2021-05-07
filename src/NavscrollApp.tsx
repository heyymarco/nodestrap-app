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

import Container from './libs/Container';
import Element   from './libs/Element';
import Indicator from './libs/Indicator';
import Content from './libs/Content';
import Navscroll, {NavscrollItem} from './libs/Navscroll';



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


	const articleRef = useRef<HTMLElement>(null);
	

    return (
        <div className="App">
            <Container>
				<Navscroll
					theme={theme} size={size} enableGradient={enableGrad}
					outlined={outlined}

					enabled={enabled} active={active}

					targetRef={articleRef}
				>
					<NavscrollItem>Empty content</NavscrollItem>
					<>First heading</>
					<>Second heading</>
					<NavscrollItem theme='success'>Thrid heading</NavscrollItem>
					<NavscrollItem>Fourth heading</NavscrollItem>
					<NavscrollItem>Empty content</NavscrollItem>
                </Navscroll>
				<article
					ref={articleRef}
					
					style={{
						height: '160px',
						width: '400px',
						border: 'solid 1px black',
						overflowY: 'auto',
						marginBlockStart: '20px',
						position: 'relative',
					}}
				>
					<section></section>
					<section>
						<h3>First heading</h3>
						<p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quibusdam odit ipsam veniam qui distinctio exercitationem, perspiciatis numquam necessitatibus commodi accusantium, suscipit tenetur eum hic cupiditate iste adipisci nemo expedita libero?</p>
					</section>
					<section>
						<h3>Second heading</h3>
						<p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quibusdam odit ipsam veniam qui </p>
					</section>
					<section>
						<h3>Thrid heading</h3>
						<p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quibusdam odit ipsam veniam qui distinctio exercitationem, perspiciatis numquam necessitatibus commodi accusantium, suscipit </p>
					</section>
					<section>
						<h3>Fourth heading</h3>
						<p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quibusdam odit ipsam veniam qui distinctio exercitationem, perspiciatis numquam necessitatibus commodi accusantium, suscipit tenetur eum hic cupiditate iste adipisci nemo expedita libero? perspiciatis numquam necessitatibus commodi accusantium, suscipit tenetur eum hic cupiditate iste adipisci nemo</p>
					</section>
					<section></section>
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
            </Container>
        </div>
    );
}

export default App;
