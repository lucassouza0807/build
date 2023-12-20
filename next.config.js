if (
    process.env.LD_LIBRARY_PATH == null ||
    !process.env.LD_LIBRARY_PATH.includes(
        `${process.env.PWD}/node_modules/canvas/build/Release:`,
    )
) {
    process.env.LD_LIBRARY_PATH = `${process.env.PWD
        }/node_modules/canvas/build/Release:${process.env.LD_LIBRARY_PATH || ''}`;
}

module.exports = {
    reactStrictMode: true,
    images: {
      domains: ['localhost', '127.0.0.1', '192.168.0.124', "sandbox.melhorenvio.com.br"],
    },
  } 