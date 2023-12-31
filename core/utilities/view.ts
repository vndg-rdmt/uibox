/*
 * (view.ts) view constructor utilities.
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

export function View<K extends keyof HTMLElementTagNameMap>(tag: K, mutator: (element: HTMLElementTagNameMap[K]) => HTMLElementTagNameMap[K]): HTMLElementTagNameMap[K] {
    return mutator(document.createElement(tag));
}

export function ViewClass<K extends HTMLElement>(element: K, mutator: (element: K) => K): K {
    return mutator(element);
}
