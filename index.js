/* 
Copyright (C) 2016 Jason Lin infwonder<AT>gmail<DOT>com

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

const xrange = require('xrange');

module.exports = 
{
  char_range: function(c1, c2, gap) {
    gap = gap || 1;

    if (typeof c1 !== 'string' || typeof c2 !== 'string') {
      throw 'C1 and C2 must all be string';
    };

    return xrange(c1.charCodeAt(0), c2.charCodeAt(0)+1, gap).map( (i) => {
      return String.fromCharCode(i)
    }); 
  },
  
  array_groups: function(array, size) {
    size = size || 1;

    if ( Array.isArray(array) === 'false' ) {
      throw 'First argument needs to be an array';
    } else if (size > array.length) {
      throw 'Cannot slice array into that many parts';
    }

    return xrange(0, array.length+1, size).map( (i) => {
      return array.slice(i,i+size);
    });
  },
};
