// // import type { NextConfig } from "next";

// // const nextConfig: NextConfig = {
// //   /* config options here */
// // };

// // export default nextConfig;

// // // next.config.js
// // import path from "path";

// // export default = {
// //   webpack: (config : any , { isServer} : any) => {
// //     if (isServer) {
// //       // Mark onnxruntime-node as an external package to exclude from client bundle
// //       config.externals = [...config.externals, "onnxruntime-node"];
// //     }

// //     // Configure node-loader to handle .node files
// //     config.module.rules.push({
// //       test: /\.node$/,
// //       loader: "node-loader",
// //     });

// //     return config;
// //   },
// // };


// import path from "path";
// import type { NextConfig } from "next";




// const nextConfig: NextConfig = {
//   experimental: {},
// };

// export default nextConfig;




// using this for solving webpack issue

// import type { NextConfig } from "next";
// import path from "path";
// const nextConfig: NextConfig = {
//   webpack: (config, { isServer }) => {
//     if (isServer) {
//       // Mark onnxruntime-node as an external package to exclude from client bundle
//       config.externals = [...(config.externals || []), "onnxruntime-node"];
//     }

//     // Configure node-loader to handle .node files
//     config.module.rules.push({
//       test: /\.node$/,
//       loader: "node-loader",
//     });

//     return config;
//   },
// };

// export default nextConfig;


// using for solving webpack issue and appdir may be

// import { NextConfig } from 'next';
// import path from 'path';

// const nextConfig: NextConfig = {
//   experimental: {
//      // Enable the App Router feature
//   },
//   webpack: (config, { isServer }) => {
//     if (isServer) {
//       // Mark onnxruntime-node as an external package to exclude from client bundle
//       config.externals = [...(config.externals || []), 'onnxruntime-node'];
//     }

//     // Configure node-loader to handle .node files
//     config.module.rules.push({
//       test: /\.node$/,
//       loader: 'node-loader',
//     });

//     return config;
//   },
// };

// export default nextConfig;


import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Mark onnxruntime-node as an external package to exclude from client bundle
      config.externals = [...(config.externals || []), 'onnxruntime-node'];
    }

    // Configure node-loader to handle .node files
    config.module.rules.push({
      test: /\.node$/,
      loader: 'node-loader',
    });

    // Suppress the import.meta warning
    config.module.parser = {
      javascript: {
        importMeta: false,
      },
    };

    // Handle .mjs files properly to prevent related errors
    config.module.rules.push({
      test: /\.mjs$/,
      
      resolve: {
        fullySpecified: false,
      },
    });

    return config;
  },
};

export default nextConfig;

