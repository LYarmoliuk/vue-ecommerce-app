<template>
  <div class="item">
    <div class="icon-container">
      <slot name="icon"></slot>
    </div>
    <div class="details">
      <h3 class="heading">
        <slot name="heading"></slot>
      </h3>
      <div class="content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style scoped>
.item {
  margin-top: 2rem;
  display: flex;
  position: relative;
  gap: 1.5rem;
  padding: 2rem;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.7) 100%);
  border-radius: 20px;
  border: 1px solid rgba(66, 184, 131, 0.1);
  backdrop-filter: blur(10px);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}

.item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #42b883, #35495e);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.4s ease;
}

.item:hover::before {
  transform: scaleX(1);
}

.item:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 40px rgba(66, 184, 131, 0.15);
  border-color: rgba(66, 184, 131, 0.3);
}

.icon-container {
  flex-shrink: 0;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
  background: linear-gradient(135deg, #42b883 0%, #35a872 100%);
  color: white;
  font-size: 1.5rem;
  box-shadow: 0 4px 12px rgba(66, 184, 131, 0.3);
  transition: all 0.3s ease;
}

.item:hover .icon-container {
  transform: scale(1.1) rotate(5deg);
  box-shadow: 0 6px 20px rgba(66, 184, 131, 0.4);
}

.details {
  flex: 1;
  min-width: 0;
}

.heading {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #2c3e50;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
  line-height: 1.3;
}

.content {
  color: #5a6c7d;
  line-height: 1.7;
  font-size: 1rem;
}

.content :deep(a) {
  color: #42b883;
  text-decoration: none;
  font-weight: 600;
  border-bottom: 2px solid transparent;
  transition: all 0.2s ease;
  padding-bottom: 2px;
}

.content :deep(a:hover) {
  color: #35a872;
  border-bottom-color: #42b883;
}

.content :deep(code) {
  background: rgba(66, 184, 131, 0.1);
  padding: 0.2rem 0.5rem;
  border-radius: 6px;
  font-family: 'Monaco', 'Courier New', monospace;
  font-size: 0.9em;
  color: #2c3e50;
}

.content :deep(p) {
  margin: 0.5rem 0;
}

.content :deep(br) {
  display: block;
  content: "";
  margin-top: 0.5rem;
}

/* Мобільна версія */
@media (max-width: 767px) {
  .item {
    flex-direction: column;
    padding: 1.5rem;
    gap: 1rem;
  }

  .icon-container {
    width: 50px;
    height: 50px;
  }

  .heading {
    font-size: 1.3rem;
  }

  .content {
    font-size: 0.95rem;
  }
}

/* Десктоп версія з timeline */
@media (min-width: 1024px) {
  .item {
    margin-top: 0;
    padding: 2rem;
    margin-left: 60px;
    position: relative;
  }

  .icon-container {
    position: absolute;
    left: -90px;
    top: 50%;
    transform: translateY(-50%);
    width: 70px;
    height: 70px;
    z-index: 2;
  }

  .item:hover .icon-container {
    transform: translateY(-50%) scale(1.1) rotate(5deg);
  }

  /* Вертикальна лінія timeline */
  .item::after {
    content: '';
    position: absolute;
    left: -55px;
    top: 0;
    bottom: 0;
    width: 3px;
    background: linear-gradient(180deg,
      rgba(66, 184, 131, 0.2) 0%,
      rgba(66, 184, 131, 0.4) 50%,
      rgba(66, 184, 131, 0.2) 100%
    );
    z-index: 1;
  }

  /* Прибираємо лінію для першого елемента зверху */
  .item:first-of-type::after {
    top: 50%;
  }

  /* Прибираємо лінію для останнього елемента знизу */
  .item:last-of-type::after {
    bottom: 50%;
  }

  /* Додаємо з'єднувальні точки */
  .item .icon-container::before {
    content: '';
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 85px;
    height: 85px;
    border: 2px dashed rgba(66, 184, 131, 0.2);
    border-radius: 50%;
    animation: rotate 20s linear infinite;
  }

  @keyframes rotate {
    from { transform: translate(-50%, -50%) rotate(0deg); }
    to { transform: translate(-50%, -50%) rotate(360deg); }
  }

  .item:hover .icon-container::before {
    border-color: rgba(66, 184, 131, 0.4);
    animation-duration: 10s;
  }
}

/* Адаптація для великих екранів */
@media (min-width: 1440px) {
  .item {
    padding: 2.5rem;
  }

  .heading {
    font-size: 1.6rem;
  }

  .content {
    font-size: 1.05rem;
  }
}
</style>
