import { Repository } from 'typeorm';
import { Item } from './item';
export declare class ItemsService {
    private itemRepository;
    constructor(itemRepository: Repository<Item>);
    findAll(): Promise<Item[]>;
    create(newItem: Item): Promise<Item>;
}
