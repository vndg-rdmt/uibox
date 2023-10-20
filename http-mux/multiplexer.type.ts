/*
 * (multiplexer.type.ts) multiplexer definition.
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


/**
 * Application multiplexor, handles routing events.
 * Responsible for pages rendering - routing pages on the client side,
 * based on provided {@link ApplicationRouter}. Does not delegates any
 * logic to higher objects, multiplexor is made up like delegate itself.
 * 
 * `Multiplexor` supports hot-route-definition because of the fact, that
 * it's delegate for `router`, so, basically, `router` turns on/off `multiplexor`
 */
export interface HTTPMultiplexer<paths extends string> {
    /**
     * Defines new absolute path for handling defined paths.
     * @param path absolute location path
     * @param handler callback, executed to handle this route.
     */
    definePath(path: paths, handler: VoidFunction): void;
    /**
     * Not-found event handler, when current location
     * is not defined within mux.
     */
    notFound: VoidFunction|null;
    /**
     * Serves current path and starts listening for location
     * changes and handles it.
     */
    serveAndListen(): void;
    /**
     * Stops http-mux for listening and serving location.
     */
    stopServing(): void
}

/**
 * ClientMultiplexor constructor signature.
 * Defined separately, due to:
 * - Multiplexor implementation defined within a separate interface,
 *   so it's more flexable.
 * - Typescript is limited to defined interfaces in place with constructors.
 */
export interface HTTPMultiplexerConstructor<T extends string> {
    new (): HTTPMultiplexer<T>,
}
