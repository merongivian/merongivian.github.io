---
layout: post
title: "Certificación de Bases de Datos, Clase #3"
date: 2014-10-22 23:41:30 -0500
comments: false
categories: [udla, aci040]
---

### Modelos de control de Acceso
- Control de acceso Discrecional(DAC): es una forma en la cual
  podemos restringir el acceso a objetos basados en la identidad o
grupos a los que pertenecen
- Seguridad a nivel de registro:
  * Se pueden aplicar sofisticadas reglas para el control de acceso
  * Complementa a DAC
  * Es provisto por VPD o por OLS

### Oracle Label Security (OLS)

  {% img /images/posts/ols-principal.png %}

<!--more-->

  - Categoriza e intercede fácilmente en el acceso a datos según su
    clasificación.
  - Integrada con Oracle Identity Management, permitiendo la gestión
    centralizada de definiciones de políticas

### Componentes data label

  {% img /images/posts/ols-componentes.png %}

## Video Laboratorio #2

<iframe class="youtube-player" type="text/html" width="640" height="385"
src="https://www.youtube.com/embed/mmws2ZdHkuA" allowfullscreen
frameborder="0">
</iframe>

## Video Laboratorio #3

<iframe class="youtube-player" type="text/html" width="640" height="385"
src="https://www.youtube.com/embed/bTAn45ejjL0" allowfullscreen
frameborder="0">
