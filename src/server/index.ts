/**
 * @module index
 */

import { Middleware } from 'koa';
import compose from 'koa-compose';
import { Compiler } from 'webpack';
import dev, { Extensions as DevExtensions, Options as DevOptions } from './dev';
import hot, { Extensions as HotExtensions, Options as HotOptions } from './hot';

export type Options = DevOptions & {
  hot?: false | HotOptions;
};

export type BaseMiddleware = Middleware & DevExtensions;
export type ExtendMiddleware = BaseMiddleware & HotExtensions;

/**
 * @function server
 * @description Create koa dev server middleware.
 * @param compiler The webpack compiler instance.
 */
export default function server(compiler: Compiler): ExtendMiddleware;
/**
 * @function server
 * @description Create koa dev server middleware.
 * @param compiler The webpack compiler instance.
 * @param options Options.
 */
export default function server(compiler: Compiler, options: Options & { hot: false }): BaseMiddleware;
/**
 * @function server
 * @description Create koa dev server middleware.
 * @param compiler The webpack compiler instance.
 * @param options Options.
 */
export default function server(compiler: Compiler, options: Options & { hot?: HotOptions }): ExtendMiddleware;
export default function server(compiler: Compiler, options: Options = {}): BaseMiddleware | ExtendMiddleware {
  const { hot: hotOptions, ...devOptions } = options;

  const devMiddleware = dev(compiler, devOptions);

  if (hotOptions === false) return devMiddleware;

  const hotMiddleware = hot(compiler, hotOptions);

  return Object.assign(compose([devMiddleware, hotMiddleware]), devMiddleware, hotMiddleware);
}
