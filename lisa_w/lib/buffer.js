'use strict';

module.exports = function(buffer){
  for(let i = 0; i < buffer.length; i++ ){
    buffer.writeUInt8(0, i);
  }
};
