import { Component } from '@angular/core';
import { MainService } from 'src/app/services/main.service';

import * as _ from 'lodash';
import { Element } from 'src/app/interfaces/Element';
import { Router } from '@angular/router';

@Component({
  selector: 'app-elements',
  templateUrl: './elements.component.html',
  styleUrls: ['./elements.component.scss'],
})
export class ElementsComponent {
  originalData: Array<Element>;

  items = {};
  allItems = {};
  search = '';

  filteredItems = {};
  constructor(private mainService: MainService, private router: Router) {
    this.mainService.getElements().subscribe(
      data => {
        this.originalData = data;
        // Indexing ALL the childrens by the id of the parent in the structure parent-${parentId}
        const childrensByParent = _.chain(data)
          .defaultTo([])
          .filter(({ parent_id }) => parent_id !== null)
          .reduce((prevChildrens, currentChildren) => {
            return {
              ...prevChildrens,
              [this.getIndex(currentChildren.parent_id)]: {
                childrens: [
                  ..._.get(
                    prevChildrens,
                    [this.getIndex(currentChildren.parent_id), 'childrens'],
                    [],
                  ),
                  currentChildren,
                ],
              },
            };
          }, {})
          .value();
        // Adding all the elements that are parents and childrens to their fathers with their children
        _.chain(data)
          .defaultTo([])
          .filter(({ id, parent_id }) => childrensByParent[this.getIndex(id)] && parent_id !== null)
          .forEach(({ id, parent_id, title }) => {
            const { childrens } = _.cloneDeep(childrensByParent[this.getIndex(id)]);
            delete childrensByParent[this.getIndex(id)];
            childrensByParent[this.getIndex(parent_id)] = {
              childrens: [
                ..._.get(childrensByParent, [this.getIndex(parent_id), 'childrens'], []).filter(
                  ({ id: childId }) => childId !== id,
                ),
                {
                  element: { id, parent_id, title },
                  childrens,
                },
              ],
            };
          })
          .value();
        // Adding all the elements that are only parents without childrens
        _.chain(data)
          .defaultTo([])
          .filter(({ parent_id }) => parent_id === null)
          .forEach(element => {
            childrensByParent[this.getIndex(element.id)] = {
              ..._.defaultTo(childrensByParent[this.getIndex(element.id)], {}),
              element,
            };
          })
          .value();
        const newValues = {
          childrens: _.values(_.sortBy(childrensByParent, (el: any) => el.element.id)),
        };
        this.allItems = newValues;
        this.items = _.clone(newValues);
      },
      err => {
        console.error(err);
      },
    );
  }
  getIndex(id) {
    return `parent-${id}`;
  }
  getKeys(node) {
    return Object.keys(node);
  }
  detailsItem(elementId) {
    this.router.navigate([`/element/${elementId}`]);
  }
  filterItems() {
    if (this.search.length > 0) {
      this.filteredItems = this.originalData
        .filter(({ title }) => title.toLowerCase().includes(this.search.toLowerCase()))
        .map(({ title, id }) => ({
          title,
          id,
        }));
      this.allItems = {
        childrens: this.filteredItems,
      };
    } else {
      this.allItems = this.items;
    }
  }
}
