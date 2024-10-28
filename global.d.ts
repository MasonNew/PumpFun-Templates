// global.d.ts
interface SolanaProvider {
    isPhantom?: boolean;
    publicKey?: {
        toString(): string;
    };
    connect(options?: { onlyIfTrusted: boolean }): Promise<{ publicKey: { toString(): string } }>;
    signAndSendTransaction(transaction: Transaction): Promise<{ signature: string }>;
    on(event: 'connect' | 'disconnect', handler: (args: any) => void): void;
    isConnected?: boolean;
}

interface Window {
    solana?: SolanaProvider;
}

