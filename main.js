import phpServer from 'php-server';

const server = await phpServer({
	base: 'public',
	port: 3001,
});
console.log(`PHP server running at ${server.url}`);