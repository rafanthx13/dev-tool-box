# PHP Code Quality — Qodana

## 01 — Tipar sempre + `@throws`

Métodos, funções e atributos devem sempre ter tipos declarados. Se houver exceção, adicione a anotação:

```php
/**
 * @throws Throwable
 */
// Tipar parâmetro e retorno. Se for retorno de framewok
// no ínico, faça o 'use' e assim tienha a tipagem do retorno
public function transferir(Request $request): JsonResponse
```

---

## 02 — Nunca use `\` inline, prefira `use`

```php
// ❌ Errado
catch (\Exception $e)

// ✅ Certo
use Exception;
catch (Exception $e)
```

Vale para qualquer classe.

---

## 03 — Não repita o valor default na chamada

Se um parâmetro já tem valor default, não passe esse mesmo valor explicitamente na chamada — o Qodana acusa redundância.

---

## 04 — Retorne direto, sem variável intermediária

```php
// ❌ Evitar
$lista = array_values($registrosFiltrados);
return $lista;

// ✅ Preferir
return array_values($registrosFiltrados);
```

Exceção: se nomear a variável ajuda na legibilidade, use um nome que reflita o propósito da função.

---

## 05 — Prefira `??` (null coalescing)

```php
// ❌ Verboso
isset($periodo) ? $periodo : ''

// ✅ Conciso
$periodo ?? ''
```

Disponível desde PHP 7.0.
