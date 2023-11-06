// ----------------------------------------------
// Remove Training
// ----------------------------------------------

function removeTraining(id) {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-primary',
      cancelButton: 'btn btn-danger',
    },
    buttonsStyling: false,
  });

  Swal
    .fire({
      title: 'Are you sure?',
      text: 'The training will be permanently removed!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'Cancel',
      reverseButtons: true,
    })
    .then((result) => {
      if (result.isConfirmed) {
        location.href = `/training/${id}?_method=DELETE`;
      }
    });
}
