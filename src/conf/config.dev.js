module.exports = {
	// 后端服务器地址
	servers: {
		// default: 'http://10.235.136.64:8088/tzqbq-dam',
		default: 'http://10.235.136.8:8050/tzqbq-dam',
		sys: 'http://10.235.136.64:8088/tzqbq-sys'
	},
	// mockServer服务器地址，仅开发环境需要，测试和生产环境不需要
	mockServers: {
		default: 'http://localhost:3000'
	}
}