document.getElementById('textarea').addEventListener('keypress', e => {
  if(e.which == 13 && !e.shiftKey) {
    document.getElementById('mainform').submit();
    e.preventDefault();
    return false;
  }
});
