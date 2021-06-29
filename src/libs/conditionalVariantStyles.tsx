// react (builds html using javascript):
import React                from 'react'        // base technology of our nodestrap components

// nodestrap (modular web components):
import {
    // general types:
    JssStyle,
    PropList,
}                           from './nodestrap'   // nodestrap's core
import {
    ActionControlStyles,
}                           from './ActionControl'



class ConditionalVariantStyles extends ActionControlStyles {
    // variants:
    public /*override*/ theme(theme: string)         : JssStyle  { return {} }

    public /*override*/ size(size: string)           : JssStyle  { return {} }

    public /*override*/ noGradient(inherit = false)  : JssStyle  { return {} }
    public /*override*/ gradient()                   : JssStyle  { return {} }

    public /*override*/ noOutlined(inherit = false)  : JssStyle  { return {} }
    public /*override*/ outlined()                   : JssStyle  { return {} }

    public /*override*/ noMild(inherit = false)      : JssStyle  { return {} }
    public /*override*/ mild()                       : JssStyle  { return {} }



    // states:
    public /*override*/ resetDefaultState(inherit = false)   : PropList { return {} }

    public /*override*/ resetEnableDisable(inherit: boolean) : PropList { return {} }
    public /*override*/ enabled()     : JssStyle { return this.enable();  }
    public /*override*/ enabling()    : JssStyle { return this.enable();  }
    public /*override*/ disabling()   : JssStyle { return this.disable(); }
    public /*override*/ disabled()    : JssStyle { return this.disable(); }
    public /*override*/ enable()      : JssStyle { return {} }
    public /*override*/ disable()     : JssStyle { return {} }

    public /*override*/ resetActivePassive(inherit: boolean) : PropList { return {} }
    public /*override*/ actived()     : JssStyle { return this.active(); }
    public /*override*/ activating()  : JssStyle { return this.active(); }
    public /*override*/ passivating() : JssStyle { return this.passive(); }
    public /*override*/ passived()    : JssStyle { return this.passive(); }
    public /*override*/ active()      : JssStyle { return {} }
    public /*override*/ passive()     : JssStyle { return {} }

    public /*override*/ toggleOffActive(inherit = false)     : PropList { return {} }
    public /*override*/ toggleOnActive()                     : PropList { return {} }

    public /*override*/ resetFocusBlur(inherit: boolean)     : PropList { return {} }
    public /*override*/ focused()     : JssStyle { return this.focus(); }
    public /*override*/ focusing()    : JssStyle { return this.focus(); }
    public /*override*/ blurring()    : JssStyle { return this.blur(); }
    public /*override*/ blurred()     : JssStyle { return this.blur(); }
    public /*override*/ focus()       : JssStyle { return {} }
    public /*override*/ blur()        : JssStyle { return {} }

    public /*override*/ resetArriveLeave(inherit: boolean)   : PropList { return {} }
    public /*override*/ arrived()     : JssStyle { return this.arrive(); }
    public /*override*/ arriving()    : JssStyle { return this.arrive(); }
    public /*override*/ leaving()     : JssStyle { return this.leave();  }
    public /*override*/ left()        : JssStyle { return this.leave();  }
    public /*override*/ arrive()      : JssStyle { return {} }
    public /*override*/ leave()       : JssStyle { return {} }

    public /*override*/ resetPressRelease(inherit: boolean)  : PropList { return {} }
    public /*override*/ pressed()     : JssStyle { return this.press();   }
    public /*override*/ pressing()    : JssStyle { return this.press();   }
    public /*override*/ releasing()   : JssStyle { return this.release(); }
    public /*override*/ released()    : JssStyle { return this.release(); }
    public /*override*/ press()       : JssStyle { return {} }
    public /*override*/ release()     : JssStyle { return {} }



    // functions:
    public /*override*/ propsFn(): PropList { return {} }



    // styles:
    public /*override*/ basicStyle(): JssStyle { return {} }
}