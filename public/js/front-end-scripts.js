document.querySelectorAll('[data-blur]').forEach(function (input) {
  input.addEventListener('blur', function () {
    var targetId = input.getAttribute('data-blur')
    var targetElement = document.getElementById(targetId)
    if (targetElement) {
      targetElement.dispatchEvent(new Event('customTrigger'))
    }
  })
})

const dynamicContentArea = document.getElementById('dynamicContentArea')

dynamicContentArea.addEventListener('focusout', function (event) {
  if (event.target.matches('input')) {
    const target = document.querySelectorAll('[hx-trigger="custom"]')
    target.forEach((e) => e.dispatchEvent(new Event('custom')))
  }
})
