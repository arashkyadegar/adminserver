import { CategoryEntity } from "../category/categoryEntity";

export class TreeView {
  list: Array<CategoryEntity>;
  tree: Array<any> = [];
  constructor(list: Array<CategoryEntity>) {
    this.list = list
  }

  loadAllChildren(id: number) {

    const r = this.findbyParent(id);
    r.forEach(element => {
      this.tree.push(element);
      this.loadAllChildren(element.id);
    });
  }

  findbyParent(parentId: number) {
    return this.list.filter(x => x.parent == parentId);
  }
  getResult() {
    return this.tree;
  }

}