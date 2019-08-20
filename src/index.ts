import * as fs from "fs";
import * as path from "path";
import { RawSource } from "webpack-sources";

const PluginName = "@magic-number/webpack-plugin";

class MagicCoverageReporter {
  /**
   * todo 增加entry过滤，支持正则表达式或者字符串
   * todo 增加控制开关，默认在production环境关闭覆盖率上报
   * @param options
   */
  constructor(private options) {}

  public apply(compiler) {
    compiler.hooks.emit.tap(PluginName, (compilation) => {
      const script = fs.readFileSync(path.join(__dirname, "CoverageClient.js"));
      if (!script) { throw new Error("Can not find Coverage Reporter"); }
      const coverageReporter = new RawSource("\n" + script);
      const { assets = {} } = compilation;
      Object.keys(assets).filter((i) => /\.js$/.test(i)).forEach((i) => {
        assets[i].add(coverageReporter);
      });
    });
  }
}

module.exports = exports = MagicCoverageReporter;
