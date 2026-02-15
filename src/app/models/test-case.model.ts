export interface TestCase {
    id: number;
    title: string;
    description: string;
    status: 'passed' | 'failed' | 'pending';
    priority: 'low' | 'medium' | 'high';
}