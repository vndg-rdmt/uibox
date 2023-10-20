/*
 * (http-mux.ts) http multiplexor implementation.
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


import { HTTPMultiplexer } from "./multiplexer.type";

/**
 * UIBox implementation of a client {@link HTTPMultiplexer}.
 */
export class HTTPMux<T extends string> implements HTTPMultiplexer<T> {
    constructor() {};

    public notFound: VoidFunction|null = null;

    public definePath(path: T, handler: VoidFunction): void {
        this.pathRegistry.set(path, handler);
    };

    public serveAndListen(): void {
        let currentPath: string = '';

        const watch = () => {
            if (window.location.pathname !== currentPath) {
                currentPath = window.location.pathname;
                this.handleChanges();
            };
            this.listenerDescriptor = requestAnimationFrame(watch);
        };
        watch();
    };

    public stopServing(): void {
        window.removeEventListener('popstate', this.handleChanges);
        if (this.listenerDescriptor !== undefined) cancelAnimationFrame(this.listenerDescriptor);
    };

    private handleChanges(): void {
        const callback = this.pathRegistry.get(window.location.pathname);
        return callback !== undefined ?
            callback() :
            this.notFound !== null ?
            this.notFound() :
            undefined
    };

    private readonly pathRegistry: Map<string, VoidFunction> = new Map();
    private listenerDescriptor: number | undefined;
}
