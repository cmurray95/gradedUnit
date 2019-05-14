import { Component, OnChanges, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.css']
})

// Detects changes to image rating and updates
export class StarRatingComponent implements OnChanges {
  @Input() rating = 0;
  starWidth = 0;
  // Creates event emitter (Event listener)
  @Output() ratingClicked: EventEmitter<string> =
    new EventEmitter<string>();

  // Edit CSS to reflect rating
  ngOnChanges(): void {
    this.starWidth = this.rating * 75 / 5;
  }

  onClick(): void {
    this.ratingClicked.emit(`The rating ${this.rating} was clicked!`);
  }
}
