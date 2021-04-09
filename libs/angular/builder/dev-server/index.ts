import {BuilderContext, createBuilder} from '@angular-devkit/architect';
import {JsonObject} from '@angular-devkit/core';
import {executeDevServerBuilder} from '@angular-devkit/build-angular';
import {Configuration} from 'webpack';
import {Observable} from 'rxjs';
import {
  DevServerBuilderOptions,
  DevServerBuilderOutput,
} from '@angular-devkit/build-angular/src/dev-server';

// хак для локальной разработки
let Plugin;
try {
  Plugin = require('@roofer/webpack-plugin').RooferWebpackPlugin;
} catch (e) {
  Plugin = require('../../webpack-plugin').RooferWebpackPlugin;
}

export const buildRoofer = createBuilder(
  (
    options: DevServerBuilderOptions & JsonObject,
    context: BuilderContext,
  ): Observable<DevServerBuilderOutput> => {
    return executeDevServerBuilder(options, context, {
      webpackConfiguration(input: Configuration) {
        input.plugins.push(new Plugin());

        input.output.jsonpFunction = Math.random().toString();

        return input;
      },
    });
  },
);

// export default почему не попадает в бандл
module.exports.default = buildRoofer;