// global.d.ts
interface SolanaProvider {
    isPhantom?: boolean;
    publicKey?: {
        toString(): string;
    };
    connect(options?: { onlyIfTrusted: boolean }): Promise<{ publicKey: { toString(): string } }>;
    on(event: 'connect' | 'disconnect', handler: (args: any) => void): void;
    isConnected?: boolean;
}

interface Window {
    solana?: SolanaProvider;
}
