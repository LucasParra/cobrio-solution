import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementsComponent } from './elements.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { ElementComponent } from '../../components/element/element.component';
import { MainService } from 'src/app/services/main.service';

import * as sinon from 'sinon';
import { FormsModule } from '@angular/forms';
import { createObservable } from 'src/test/utils';

const mockData = [
  {
    id: 1,
    title: 'Item 1',
    parent_id: null,
  },
  {
    id: 2,
    title: 'Item 2',
    parent_id: 1,
  },
  {
    id: 3,
    title: 'Item 3',
    parent_id: 2,
  },
  {
    id: 4,
    title: 'Item 4',
    parent_id: null,
  },
  {
    id: 5,
    title: 'Item 5',
    parent_id: null,
  },
  {
    id: 6,
    title: 'Item 6',
    parent_id: 5,
  },
  {
    id: 7,
    title: 'Item 7',
    parent_id: 6,
  },
  {
    id: 8,
    title: 'Item 8',
    parent_id: 6,
  },
];
const mainExpectBuild = {
  childrens: [
    {
      childrens: [
        {
          element: { id: 2, parent_id: 1, title: 'Item 2' },
          childrens: [{ id: 3, title: 'Item 3', parent_id: 2 }],
        },
      ],
      element: { id: 1, title: 'Item 1', parent_id: null },
    },
    { element: { id: 4, title: 'Item 4', parent_id: null } },
    {
      childrens: [
        {
          element: { id: 6, parent_id: 5, title: 'Item 6' },
          childrens: [
            { id: 7, title: 'Item 7', parent_id: 6 },
            { id: 8, title: 'Item 8', parent_id: 6 },
          ],
        },
      ],
      element: { id: 5, title: 'Item 5', parent_id: null },
    },
  ],
};
describe('ElementsComponent', () => {
  let component: ElementsComponent;
  let fixture: ComponentFixture<ElementsComponent>;

  const fakeHttp = {
    getElements: sinon.fake(() => createObservable(mockData)),
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ElementsComponent, ElementComponent],
      imports: [HttpClientModule, RouterTestingModule, FormsModule],
    }).compileComponents();
    TestBed.overrideProvider(MainService, {
      useValue: fakeHttp,
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Should call to the main service bringind the information and indexing it', () => {
    expect(component.allItems).toEqual(mainExpectBuild);
    expect(component.items).toEqual(mainExpectBuild);
  });
  it('Should show only the filtered data', () => {
    const expectFilterData = [{ title: 'Item 1', id: 1 }];
    component.search = 'item 1';
    component.filterItems();
    expect(component.filteredItems).toEqual(expectFilterData);
    expect(component.allItems).toEqual({
      childrens: expectFilterData,
    });
  });
  it('Should set the default data if the user try to filter with an empty string', () => {
    component.search = '';
    component.filterItems();
    expect(component.filteredItems).toEqual({});
    expect(component.allItems).toEqual(mainExpectBuild);
  });
});
