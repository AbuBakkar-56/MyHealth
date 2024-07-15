document.getElementById('openSearchModal').onclick = function() {
    document.getElementById('customSearchModal').style.display = 'block';
  }
  window.onclick = function(event) {
    if (event.target == document.getElementById('customSearchModal')) {
      document.getElementById('customSearchModal').style.display = 'none';
    }
  }