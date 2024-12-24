// vite.config.ts
import path from "node:path";
import Vue from "file:///D:/work/1688-get/.yarn/__virtual__/@vitejs-plugin-vue-virtual-2d9eaf8ac0/0/cache/@vitejs-plugin-vue-npm-5.2.1-25d60c16d1-4f3add595b.zip/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import Unocss from "file:///D:/work/1688-get/.yarn/__virtual__/unocss-virtual-da8318239c/0/cache/unocss-npm-0.65.2-3e4a5e9db8-7cb65858bc.zip/node_modules/unocss/dist/vite.mjs";
import { ElementPlusResolver } from "file:///D:/work/1688-get/.yarn/__virtual__/unplugin-vue-components-virtual-6047ca8fa8/0/cache/unplugin-vue-components-npm-0.27.5-eed9638006-597074b63b.zip/node_modules/unplugin-vue-components/dist/resolvers.js";
import Components from "file:///D:/work/1688-get/.yarn/__virtual__/unplugin-vue-components-virtual-6047ca8fa8/0/cache/unplugin-vue-components-npm-0.27.5-eed9638006-597074b63b.zip/node_modules/unplugin-vue-components/dist/vite.js";
import VueRouter from "file:///D:/work/1688-get/.yarn/__virtual__/unplugin-vue-router-virtual-eefb5217e2/0/cache/unplugin-vue-router-npm-0.10.9-a5af3d968d-359cbc8493.zip/node_modules/unplugin-vue-router/dist/vite.js";
import { defineConfig } from "file:///D:/work/1688-get/.yarn/__virtual__/vite-virtual-2df83e75f0/0/cache/vite-npm-6.0.5-7387b23353-5119168402.zip/node_modules/vite/dist/node/index.js";
var __vite_injected_original_dirname = "D:\\work\\1688-get";
var proxy = createProxy([
  ["/api", "https://p4psearch.1688.com"]
  // [VITE_API_URL_PREFIX, API_URL],
  // [VITE_MOCK_URL_PREFIX, VITE_MOCK_API_URL],
]);
function createProxy(list = []) {
  const httpsRE = /^https:\/\//;
  const ret = {};
  for (const [prefix, target] of list) {
    const isHttps = httpsRE.test(target);
    ret[prefix] = {
      target,
      changeOrigin: true,
      ws: true,
      rewrite: (path2) => path2.replace(new RegExp(`^${prefix}`), ""),
      // https is require secure=false
      ...isHttps ? { secure: false } : {}
    };
  }
  return ret;
}
var vite_config_default = defineConfig({
  resolve: {
    alias: {
      "~/": `${path.resolve(__vite_injected_original_dirname, "src")}/`
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "~/styles/element/index.scss" as *;`,
        api: "modern-compiler"
      }
    }
  },
  server: {
    open: true,
    // 端口
    // port,
    // 监听所有本地 IP
    host: true,
    // 是否开启 https
    https: false,
    // 代理
    proxy
  },
  plugins: [
    Vue(),
    // https://github.com/posva/unplugin-vue-router
    VueRouter({
      extensions: [".vue", ".md"],
      dts: "src/typed-router.d.ts"
    }),
    Components({
      // allow auto load markdown components under `./src/components/`
      extensions: ["vue", "md"],
      // allow auto import and register components used in markdown
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      resolvers: [
        ElementPlusResolver({
          importStyle: "sass"
        })
      ],
      dts: "src/components.d.ts"
    }),
    // https://github.com/antfu/unocss
    // see uno.config.ts for config
    Unocss()
  ],
  ssr: {
    // TODO: workaround until they support native ESM
    noExternal: ["element-plus"]
  }
});
export {
  createProxy,
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlUm9vdCI6ICJEOlxcd29ya1xcMTY4OC1nZXRcXCIsCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDpcXFxcd29ya1xcXFwxNjg4LWdldFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcd29ya1xcXFwxNjg4LWdldFxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovd29yay8xNjg4LWdldC92aXRlLmNvbmZpZy50c1wiO2ltcG9ydCBwYXRoIGZyb20gJ25vZGU6cGF0aCdcclxuaW1wb3J0IFZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnXHJcblxyXG5pbXBvcnQgVW5vY3NzIGZyb20gJ3Vub2Nzcy92aXRlJ1xyXG5pbXBvcnQgeyBFbGVtZW50UGx1c1Jlc29sdmVyIH0gZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvcmVzb2x2ZXJzJ1xyXG5pbXBvcnQgQ29tcG9uZW50cyBmcm9tICd1bnBsdWdpbi12dWUtY29tcG9uZW50cy92aXRlJ1xyXG5pbXBvcnQgVnVlUm91dGVyIGZyb20gJ3VucGx1Z2luLXZ1ZS1yb3V0ZXIvdml0ZSdcclxuXHJcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnXHJcbmltcG9ydCB0eXBlIHsgUHJveHlPcHRpb25zIH0gZnJvbSAndml0ZSdcclxudHlwZSBQcm94eUl0ZW0gPSBbc3RyaW5nLCBzdHJpbmddXHJcbnR5cGUgUHJveHlMaXN0ID0gUHJveHlJdGVtW11cclxudHlwZSBQcm94eVRhcmdldExpc3QgPSBSZWNvcmQ8c3RyaW5nLCBQcm94eU9wdGlvbnMgJiB7IHJld3JpdGU6IChwYXRoOiBzdHJpbmcpID0+IHN0cmluZyB9PlxyXG4gIC8vIFx1NEVFM1x1NzQwNlx1OTE0RFx1N0Y2RVxyXG4gIGNvbnN0IHByb3h5ID0gY3JlYXRlUHJveHkoW1xyXG5cclxuICAgIFsnL2FwaScsICdodHRwczovL3A0cHNlYXJjaC4xNjg4LmNvbSddXHJcbiAgICAvLyBbVklURV9BUElfVVJMX1BSRUZJWCwgQVBJX1VSTF0sXHJcbiAgICAvLyBbVklURV9NT0NLX1VSTF9QUkVGSVgsIFZJVEVfTU9DS19BUElfVVJMXSxcclxuICBdKVxyXG4vKipcclxuICogXHU3NTFGXHU2MjEwXHU0RUUzXHU3NDA2XHJcbiAqIEBwYXJhbSBsaXN0XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlUHJveHkobGlzdDogUHJveHlMaXN0ID0gW10pIHtcclxuICBjb25zdCBodHRwc1JFID0gL15odHRwczpcXC9cXC8vXHJcbiAgY29uc3QgcmV0OiBQcm94eVRhcmdldExpc3QgPSB7fVxyXG4gIGZvciAoY29uc3QgW3ByZWZpeCwgdGFyZ2V0XSBvZiBsaXN0KSB7XHJcbiAgICBjb25zdCBpc0h0dHBzID0gaHR0cHNSRS50ZXN0KHRhcmdldClcclxuXHJcbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vaHR0cC1wYXJ0eS9ub2RlLWh0dHAtcHJveHkjb3B0aW9uc1xyXG4gICAgcmV0W3ByZWZpeF0gPSB7XHJcbiAgICAgIHRhcmdldCxcclxuICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlLFxyXG4gICAgICB3czogdHJ1ZSxcclxuICAgICAgcmV3cml0ZTogKHBhdGg6IHN0cmluZykgPT4gcGF0aC5yZXBsYWNlKG5ldyBSZWdFeHAoYF4ke3ByZWZpeH1gKSwgJycpLFxyXG4gICAgICAvLyBodHRwcyBpcyByZXF1aXJlIHNlY3VyZT1mYWxzZVxyXG4gICAgICAuLi4oaXNIdHRwcyA/IHsgc2VjdXJlOiBmYWxzZSB9IDoge30pXHJcbiAgICB9XHJcbiAgfVxyXG4gIHJldHVybiByZXRcclxufVxyXG5cclxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcclxuICByZXNvbHZlOiB7XHJcbiAgICBhbGlhczoge1xyXG4gICAgICAnfi8nOiBgJHtwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnc3JjJyl9L2AsXHJcbiAgICB9LFxyXG4gIH0sXHJcblxyXG4gIGNzczoge1xyXG4gICAgcHJlcHJvY2Vzc29yT3B0aW9uczoge1xyXG4gICAgICBzY3NzOiB7XHJcbiAgICAgICAgYWRkaXRpb25hbERhdGE6IGBAdXNlIFwifi9zdHlsZXMvZWxlbWVudC9pbmRleC5zY3NzXCIgYXMgKjtgLFxyXG4gICAgICAgIGFwaTogJ21vZGVybi1jb21waWxlcicsXHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgc2VydmVyOiB7XHJcbiAgICBvcGVuOiB0cnVlLFxyXG4gICAgLy8gXHU3QUVGXHU1M0UzXHJcbiAgIC8vIHBvcnQsXHJcbiAgICAvLyBcdTc2RDFcdTU0MkNcdTYyNDBcdTY3MDlcdTY3MkNcdTU3MzAgSVBcclxuICAgIGhvc3Q6IHRydWUsXHJcbiAgICAvLyBcdTY2MkZcdTU0MjZcdTVGMDBcdTU0MkYgaHR0cHNcclxuICAgIGh0dHBzOiBmYWxzZSxcclxuICAgIC8vIFx1NEVFM1x1NzQwNlxyXG4gICAgcHJveHlcclxuICB9LFxyXG4gIHBsdWdpbnM6IFtcclxuICAgIFZ1ZSgpLFxyXG5cclxuICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9wb3N2YS91bnBsdWdpbi12dWUtcm91dGVyXHJcbiAgICBWdWVSb3V0ZXIoe1xyXG4gICAgICBleHRlbnNpb25zOiBbJy52dWUnLCAnLm1kJ10sXHJcbiAgICAgIGR0czogJ3NyYy90eXBlZC1yb3V0ZXIuZC50cycsXHJcbiAgICB9KSxcclxuXHJcbiAgICBDb21wb25lbnRzKHtcclxuICAgICAgLy8gYWxsb3cgYXV0byBsb2FkIG1hcmtkb3duIGNvbXBvbmVudHMgdW5kZXIgYC4vc3JjL2NvbXBvbmVudHMvYFxyXG4gICAgICBleHRlbnNpb25zOiBbJ3Z1ZScsICdtZCddLFxyXG4gICAgICAvLyBhbGxvdyBhdXRvIGltcG9ydCBhbmQgcmVnaXN0ZXIgY29tcG9uZW50cyB1c2VkIGluIG1hcmtkb3duXHJcbiAgICAgIGluY2x1ZGU6IFsvXFwudnVlJC8sIC9cXC52dWVcXD92dWUvLCAvXFwubWQkL10sXHJcbiAgICAgIHJlc29sdmVyczogW1xyXG4gICAgICAgIEVsZW1lbnRQbHVzUmVzb2x2ZXIoe1xyXG4gICAgICAgICAgaW1wb3J0U3R5bGU6ICdzYXNzJyxcclxuICAgICAgICB9KSxcclxuICAgICAgXSxcclxuICAgICAgZHRzOiAnc3JjL2NvbXBvbmVudHMuZC50cycsXHJcbiAgICB9KSxcclxuXHJcbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vYW50ZnUvdW5vY3NzXHJcbiAgICAvLyBzZWUgdW5vLmNvbmZpZy50cyBmb3IgY29uZmlnXHJcbiAgICBVbm9jc3MoKSxcclxuICBdLFxyXG5cclxuICBzc3I6IHtcclxuICAgIC8vIFRPRE86IHdvcmthcm91bmQgdW50aWwgdGhleSBzdXBwb3J0IG5hdGl2ZSBFU01cclxuICAgIG5vRXh0ZXJuYWw6IFsnZWxlbWVudC1wbHVzJ10sXHJcbiAgfSxcclxufSlcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUF3TyxPQUFPLFVBQVU7QUFDelAsT0FBTyxTQUFTO0FBRWhCLE9BQU8sWUFBWTtBQUNuQixTQUFTLDJCQUEyQjtBQUNwQyxPQUFPLGdCQUFnQjtBQUN2QixPQUFPLGVBQWU7QUFFdEIsU0FBUyxvQkFBb0I7QUFSN0IsSUFBTSxtQ0FBbUM7QUFjdkMsSUFBTSxRQUFRLFlBQVk7QUFBQSxFQUV4QixDQUFDLFFBQVEsNEJBQTRCO0FBQUE7QUFBQTtBQUd2QyxDQUFDO0FBS0ksU0FBUyxZQUFZLE9BQWtCLENBQUMsR0FBRztBQUNoRCxRQUFNLFVBQVU7QUFDaEIsUUFBTSxNQUF1QixDQUFDO0FBQzlCLGFBQVcsQ0FBQyxRQUFRLE1BQU0sS0FBSyxNQUFNO0FBQ25DLFVBQU0sVUFBVSxRQUFRLEtBQUssTUFBTTtBQUduQyxRQUFJLE1BQU0sSUFBSTtBQUFBLE1BQ1o7QUFBQSxNQUNBLGNBQWM7QUFBQSxNQUNkLElBQUk7QUFBQSxNQUNKLFNBQVMsQ0FBQ0EsVUFBaUJBLE1BQUssUUFBUSxJQUFJLE9BQU8sSUFBSSxNQUFNLEVBQUUsR0FBRyxFQUFFO0FBQUE7QUFBQSxNQUVwRSxHQUFJLFVBQVUsRUFBRSxRQUFRLE1BQU0sSUFBSSxDQUFDO0FBQUEsSUFDckM7QUFBQSxFQUNGO0FBQ0EsU0FBTztBQUNUO0FBR0EsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsTUFBTSxHQUFHLEtBQUssUUFBUSxrQ0FBVyxLQUFLLENBQUM7QUFBQSxJQUN6QztBQUFBLEVBQ0Y7QUFBQSxFQUVBLEtBQUs7QUFBQSxJQUNILHFCQUFxQjtBQUFBLE1BQ25CLE1BQU07QUFBQSxRQUNKLGdCQUFnQjtBQUFBLFFBQ2hCLEtBQUs7QUFBQSxNQUNQO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLFFBQVE7QUFBQSxJQUNOLE1BQU07QUFBQTtBQUFBO0FBQUE7QUFBQSxJQUlOLE1BQU07QUFBQTtBQUFBLElBRU4sT0FBTztBQUFBO0FBQUEsSUFFUDtBQUFBLEVBQ0Y7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLElBQUk7QUFBQTtBQUFBLElBR0osVUFBVTtBQUFBLE1BQ1IsWUFBWSxDQUFDLFFBQVEsS0FBSztBQUFBLE1BQzFCLEtBQUs7QUFBQSxJQUNQLENBQUM7QUFBQSxJQUVELFdBQVc7QUFBQTtBQUFBLE1BRVQsWUFBWSxDQUFDLE9BQU8sSUFBSTtBQUFBO0FBQUEsTUFFeEIsU0FBUyxDQUFDLFVBQVUsY0FBYyxPQUFPO0FBQUEsTUFDekMsV0FBVztBQUFBLFFBQ1Qsb0JBQW9CO0FBQUEsVUFDbEIsYUFBYTtBQUFBLFFBQ2YsQ0FBQztBQUFBLE1BQ0g7QUFBQSxNQUNBLEtBQUs7QUFBQSxJQUNQLENBQUM7QUFBQTtBQUFBO0FBQUEsSUFJRCxPQUFPO0FBQUEsRUFDVDtBQUFBLEVBRUEsS0FBSztBQUFBO0FBQUEsSUFFSCxZQUFZLENBQUMsY0FBYztBQUFBLEVBQzdCO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFsicGF0aCJdCn0K
