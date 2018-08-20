const $ = require('jquery')

 exports = urls => {
  $.ajax({
    url: '/ccu/v3/invalidate/url/{network}', // ????
    method: 'POST',
    contentType: 'application/json; charset=utf-8',
    dataType: 'json',
    data: JSON.stringify({objects: urls}),
    success: response => {

    },
    error: (xhr, status, error) => {
      console.error(xhr, status, error)
      server.close(done)
    }
  })
 } 