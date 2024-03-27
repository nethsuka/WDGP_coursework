  //Making navbar buttons active
            
  function toggleActive(element) {
    // Remove 'active' class from all navbar items
    document.querySelectorAll('.navbar a').forEach(function(navItem) {
        navItem.classList.remove('active');
    });
    
    // Add 'active' class to the clicked navbar item
    element.classList.add('active');

  }

  const feedback = document.getElementById( 'feedback' );
  const name = document.getElementById( 'name' );
  const email = document.getElementById( 'email' );

form.addEventListener('submit' , e => {
    e.preventDefault();
    validateInputs();

});

