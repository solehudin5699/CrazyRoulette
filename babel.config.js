module.exports = {
	presets: ["module:metro-react-native-babel-preset"],
	plugins: [
		[
			"module-resolver",
			{
				root: ["./src"],
				extensions: [".ts", ".tsx", ".jsx", ".js", ".json"],
				alias: {
					src: "./",
					assets: "assets",
					screens: "screens",
					navigation: "navigation",
					components: "components",
					hoc: "hoc",
					hooks: "hooks",
					utils: "utils",
					styles: "styles",
					interface: "interface",
				},
			},
		],
		"react-native-reanimated/plugin",
	],
};
