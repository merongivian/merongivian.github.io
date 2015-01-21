---
layout: post
title: "Enmascaramiento de Datos (Data Masking)"
date: 2015-01-21 07:55:04 -0500
comments: false
categories: [udla, aci040]
---

{% img center http://www.toadworld.com/cfs-file.ashx/__key/communityserver-wikis-components-files/00-00-00-00-03/SJH_2D00_060414_2D00_1.png%}

### Introducción

Se calcula que más del 50% de los datos almacenados en bases de datos podría clasificarse como confidencial. Por otro lado, el riesgo asociado a las filtraciones de datos no hace más que aumentar a medida que los departamentos de IT recogen y almacenan de manera cada vez más prolongada un número creciente de datos.

<!--more-->

Las soluciones para garantizar la seguridad de las bases de datos son difíciles de configurar y de administrar. Las soluciones de codificación manual, por su parte, requieren mucho trabajo y dan pie a la comisión de errores. No obstante, su organización de IT necesita automatizar los procesos de enmascaramiento de datos para aumentar la productividad y reducir los costes. Oracle® Data Masking™ es un software completo, flexible y escalable que se emplea para gestionar el acceso a datos sensibles de aplicaciones (p.ej., información de tarjetas de crédito, números de la Seguridad Social, nombres, direcciones, números de teléfono, etc.). Este software evita la exposición involuntaria de información confidencial y disminuye el riesgo de filtración de datos. Oracle Data Masking minimiza el riesgo de filtración de datos enmascarando los entornos de desarrollo y de pruebas creados a partir de copias o subconjuntos de datos de producción. Gracias a este software, los equipos de IT pueden contar con reglas de enmascaramiento sofisticadas pero flexibles a la vez, que les permiten aplicar distintas clases de máscaras a diversos tipos de datos empleados en entornos de no producción (de pruebas, formación, etc.).

Oracle Data Masking resulta idónea para reducir el riesgo de filtración de datos; mejorar la calidad de las actividades de desarrollo, pruebas y formación; y respaldar el cumplimiento de normativas y disposiciones internas, industriales y gubernamentales relacionadas con la privacidad de los datos.

{% img center http://www.digora.com/wp-content/uploads/2013/09/11-2-0-4-c.png %}

### Limitaciones

Por un lado, se ha de tener en cuenta que los procesos de data masking están diseñados para ser irreversibles, en el sentido de que no se podría volver a recuperar el dato inicial.

No obstante, cabe decir que mediante el cruce de información o el múltiple acceso a datos enmascarados y realizando un gran esfuerzo se podrían llegar a obtener de alguna manera los datos sensibles que han sido enmascarados. Aplicando un proceso de enmascaramiento de datos la idea es que sea difícil realizarlo, pero con esfuerzo es importante señalar que se podría llegar a lograr.

Hay que tener en cuenta también que en cuanto al desarrollo de sistemas siempre se necesita un acceso a producción para casos puntuales que requiere conectarse a los datos reales, eso no se puede abolir ya que incidencias siempre existen y se necesitan reparar datos reales de producción. No obstante, lo que se deberá hacer en estos casos es que las personas que están gobernando los datos puedan verificar la información de producción a la que están accediendo y que no deberían ver para evitar de esta manera filtraciones de información.

### Video

<iframe class="youtube-player" type="text/html" width="640" height="385"
src="https://www.youtube.com/embed/dcldnaukpcI" allowfullscreen
frameborder="0">
</iframe>
