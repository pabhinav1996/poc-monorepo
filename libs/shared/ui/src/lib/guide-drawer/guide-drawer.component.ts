import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'poc-guide-drawer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './guide-drawer.component.html',
  styleUrls: ['./guide-drawer.component.scss'],
})
export class GuideDrawerComponent {
  @Input() isOpen = false;
  @Input() title = 'Operation Guide';
  @Output() close = new EventEmitter<void>();

  guideSteps = [
    { title: '1', content: 'Lorem ipsum dolor sit amet consectetur. In luctus eget diam tellus posuere maecenas turpis. Non in nibh potenti in suscipit orci quisque. Urna volutpat convallis viverra duis eget quam ipsum. Duis in nunc odio condimentum in. Habitant aliquet amet gravida sed habitant pellentesque. Morbi in erat tristique quis cursus tincidunt proin. Nulla quam orci nulla praesent at mauris lacus consectetur venenatis. Vel urna eu augue sit. Eleifend egestas lectus varius velit ut id sit velit sed. Bibendum ultrices maecenas cursus morbi. Diam duis enim sit facilisis at.' },
    { title: '2', content: 'Aenean quam sed eu in fringilla. Enim aliquam fringilla purus duis sem dapibus. Neque blandit orci porttitor proin justo vestibulum risus pellentesque. Id magnis fermentum volutpat laoreet amet pellentesque vestibulum. Elit justo diam accumsan vitae mauris commodo ipsum vulputate. Laoreet vel viverra lectus sagittis varius. Eu nulla in lectus iaculis lacinia mattis. Pulvinar eget egestas lobortis sapien amet vel sit scelerisque mattis. Pellentesque in eget vitae nullam orci condimentum magna curabitur. Cras sed ornare et amet in nunc massa.' },
    { title: '3', content: 'Sociis morbi nisl faucibus adipiscing blandit sem semper felis. Fermentum nunc rhoncus amet nisi dictum purus aliquet dapibus neque. Morbi volutpat vulputate ut mattis enim duis in tincidunt.' },
    { title: '4', content: 'Tincidunt magnis cras ipsum viverra nibh consectetur ipsum nibh donec. Vulputate nam nulla sit ultrices est integer vel diam. Enim egestas duis non felis tortor ornare in mattis. Dui blandit fringilla aliquet leo laoreet suspendisse diam. Platea nec id sed tincidunt dui vestibulum vestibulum orci. Blandit ornare a ultricies posuere lorem sed donec egestas. Turpis tellus pellentesque adipiscing et velit.' },
    { title: '5', content: 'Convallis nunc ut amet egestas consequat velit viverra consectetur ac. Augue pulvinar vitae nulla sit egestas leo velit elementum nibh. Elit pharetra elementum nunc egestas. Sed purus pretium cras dolor non feugiat erat fusce ut. Velit vel in aliquet justo in. Nisl blandit ipsum urna id fermentum morbi vitae pretium. Egestas dui tortor sed semper suscipit est in diam' },
    { title: '6', content: 'consequat. Viverra proin lorem elit proin nulla. Nunc urna amet elit augue volutpat ultrices proin eget. Facilisi nibh sed ullamcorper sociis velit integer arcu. Volutpat felis urna est tristique urna est adipiscing. Vitae commodo enim in neque tortor at justo in. Enim dolor erat egestas eget placerat suspendisse egestas egestas nunc. Suscipit ut amet egestas eu.' },
  ];
}
