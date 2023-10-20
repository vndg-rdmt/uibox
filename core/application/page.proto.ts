/*
 * (page.proto.ts) app page definition.
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


export type UIPageEvents = 'render' | 'remove';

export abstract class UIPage {

    protected constructor() {}

    /**
     * Page root html-element via which it's being rendered to the app.
     * All page views shoud be appended to it.
     */
    protected readonly root: HTMLElement = document.createElement('div');
    
    /**
     * Holds all of the {@link UIPageEvents} subsribers to dispatch events and
     * provide an ability to unsubscribe from events.
     */
    private readonly eventSubscriptions: Map<UIPageEvents, Map<VoidFunction, boolean>> = new Map([
        ['render', new Map()],
        ['remove', new Map()],
    ])

    /**
     * Dispatches specified event type to subscribers.
     * @param eventType {@link UIPageEvents} event name.
     */
    protected dispatchEvent(eventType: UIPageEvents): void {
        this.eventSubscriptions.get(eventType)!.forEach((_, callback) => void callback());
    }

    /**
     * Renders page to the provided view.
     * Dispatches `render` event before being removed.
     */
    public render(mount: HTMLElement): void {
        this.dispatchEvent('render');
        mount.appendChild(this.root);
    }

    /**
     * Removes page from the mount point.
     * Dispatches `remove` event before being removed.
     */
    public remove(): void {
        this.dispatchEvent('remove');
        this.root.remove();
    }
    
    /**
     * Subscribes to the specified page event type.
     * @param eventType {@link UIPageEvents} event name.
     * @param subscriptions callback to be executed when {@link eventType} if fired on this page.
     */
    public addEventListener(eventType: UIPageEvents, ...subscriptions: VoidFunction[]): void {
        for (let i = 0; i < subscriptions.length; i++) {
            this.eventSubscriptions.get(eventType)?.set(subscriptions[i], true);
        };
    }

    /**
     * Unsubcribes from the specified page event type.
     * @param eventType {@link UIPageEvents} event name.
     * @param subscriptions callback to be executed when {@link eventType} if fired on this page.
     */
    public removeEventListener(pageEvent: UIPageEvents, ...subscriptions: VoidFunction[]): void {
        for (let i = 0; i < subscriptions.length; i++) {
            this.eventSubscriptions.get(pageEvent)?.delete((subscriptions[i]));
        };
    }
}
