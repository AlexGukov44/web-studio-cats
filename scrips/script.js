const range = document.getElementById('height-range');
    const userElement = document.querySelector('.user');
    const field = document.querySelector('.field');

    function updateUserPosition() {
      const value = parseInt(range.value); // Значение от 0 до 100
      
      // Получаем реальные размеры в пикселях
      const fieldHeight = field.offsetHeight;
      const userHeight = userElement.offsetHeight;

      // 1. Считаем позицию в пикселях (0% = верх, 100% = низ)
      // Вычитаем userHeight, чтобы элемент не вылезал за нижнюю границу своим низом
      let calculatedTop = (value / 100) * (fieldHeight - userHeight);

      // 2. ГЛАВНОЕ: Ограничиваем значение (Clamping)
      // Math.max(0, ...) гарантирует, что top не будет меньше 0 (не вылезет вверх)
      // Math.min(..., fieldHeight - userHeight) гарантирует, что не вылезет вниз
      const minTop = 0;
      const maxTop = fieldHeight - userHeight;
      
      const finalTop = Math.max(minTop, Math.min(maxTop, calculatedTop));

      userElement.style.top = finalTop + 'px';
    }

    range.addEventListener('input', updateUserPosition);
    updateUserPosition(); // Запуск при загрузке