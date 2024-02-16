import { ItemsService } from './items.service';
import { Item } from './item';
export declare class ItemsController {
    private readonly itemsService;
    constructor(itemsService: ItemsService);
    findAll(): Promise<Item[]>;
    create(item: Item): Promise<Item>;
}
