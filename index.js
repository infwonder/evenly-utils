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

'use strict';

const xrange = require('xrange');
const C = require('crypto');
const math = require('mathjs');
const check = require('check-types');

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

    var total = array.length + 1;
    var frac = math.mod(total, size);
    var groups = ((total - frac)/size) + 1;

    return xrange(0, array.length+1, groups).map( (i) => {
      return array.slice(i,i+groups);
    });
  },

  bucketmap: function(level) {
    level = level || 1;
  
    if (level > 4) {
      throw 'Currently, Evenly only supports up to 65536 nodes per ring';
    } else if (!(check.integer(level))) {
      throw 'Level must be an integer'
    }
    
    var p = Array.apply( null, Array(level) ).map( () => {return '0'} ).join('');
    var s = -1 * level;
    var i = math.pow(16, level);
    var e = xrange(0,i).toArray();
    var h = e.map( (j) => { return ( p + (j).toString(16)).substr(s) } );
    var bout = {};
  
    h.map( (k) => { bout[k] = C.createHash('md5').update(k).digest('hex');} );
  
    return bout;
  }
};
