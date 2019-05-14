/**
 * Allows for manipulation of characters to spaces
 * Used for formatting image text
 */

import { Pipe, PipeTransform } from '@angular/core';

// Sets name of pipe function
@Pipe({
  name: 'convertToSpaces'
})
export class ConvertToSpacesPipe implements PipeTransform {

  // Loops through string replacing sent character to whitespace
  transform(value: string, character: string): string {
    return value.replace(character, ' ');
  }
}
