var __importDefault =
  (this && this.__importDefault) || ((mod) => (mod && mod.__esModule ? mod : { default: mod }));
Object.defineProperty(exports, "__esModule", { value: true });
var vite_1 = __importDefault(require("@tailwindcss/vite"));
var plugin_react_1 = __importDefault(require("@vitejs/plugin-react"));
var vite_2 = require("vite");
// https://vite.dev/config/
exports.default = (0, vite_2.defineConfig)({
  plugins: [(0, plugin_react_1.default)(), (0, vite_1.default)()],
});
