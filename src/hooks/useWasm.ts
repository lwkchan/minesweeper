import { useEffect } from 'react';

export function useWasm()  {
    return useEffect(() => {
        import('../wasm')
          .then((pkg) => {
            pkg.greet(
                `👋 Hello. 
                This alert is powered by WebAssembly! 
                Soon I hope to have some of the more memory-intensive bits of logic in Wasm too.
                Check out its progress in the Github repo.`
            );
          })
          .catch(console.error);

        }, []);
}
