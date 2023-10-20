/*
 * (controller.ts) uibox module exports.
 * 
 * Copyright (c) 2023 Belousov Daniil
 * All rights reserved.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
 * IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 *
 * Licensed under the 'GNU General Public License v3.0'
 * For more information, please refer to <https://www.gnu.org/licenses/gpl-3.0.html>
 */


import style from './static.module.css';

import { UIPage } from "./page.proto";
import { View } from '../utilities';


export interface ApplicationConfig {
    /**
     * App's essentials components rendering point, static point,
     * where app is mounted.
     * 
     * By default (value is `undefined`), equals to `document.body`,
     * which is prefered value, because app content is being rendered
     * to the internal static element anyway, but for flexibility,
     * ability to control mount point is exposed to programmer.
     */
    readonly appMount?: HTMLElement,
    /**
     * CSS class, applied to the app content root view.
     */
    readonly rootViewCSSClass?: string
}


export class UIBoxApplicationController {

    /**
     * Renders element to the static app safe area.
     * @param widgets static ui elements
     */
    public renderWidget(...widgets: HTMLElement[]): void {
        this.safeAreaView.append(...widgets);
    }

    /**
     * App root element, where application-controller renders content.
     */
    protected readonly rootView: HTMLElement = View('div', (e) => {
        e.style.position = 'absolute';
        return e;
    })

    /**
     * Fixed window sized area, which is used to render
     * static or utlity views, it's not affeced during the pages rendering.
     */
    protected readonly safeAreaView: HTMLElement = View('div', (e) => {
        e.className = style.safe_area;
        return e;
    })

    /**
     * Holds currently rendered page if exists.
     */
    private currentPage: UIPage|null = null;

    /**
     * Swaps content to a new page.
     * @param page page to be rendered in the app.
     */
    public swapPageTo(page: UIPage): void {
        if (this.currentPage !== null) {
            this.currentPage.remove();
        };
        page.render(this.rootView);
        this.currentPage = page;
    };

    constructor(config: ApplicationConfig) {

        /**
         * Create real used configuration, which represented as a copy
         * of the passed {@link config}. Matches proper or default values
         */
        const Configuration: ApplicationConfig = {
            appMount:                 config.appMount                 || document.body,
            rootViewCSSClass:         config.rootViewCSSClass         || '',
        };
    
        this.rootView.className = Configuration.rootViewCSSClass!;
        
        this.run = () => void Configuration.appMount?.append(
            this.rootView, this.safeAreaView,
        );
    };

    /**
     * Starts app
     */
    public readonly run: VoidFunction;
}
