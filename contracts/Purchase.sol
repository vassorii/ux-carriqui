// SPDX-License-Identifier: MIT
pragma solidity >=0.4.11;

contract Purchase {
  uint public value;
  address payable public seller;
  address payable public buyer;
  enum State {Created, Locked, Inactive}
  State public state;

  constructor() public payable {
    seller = msg.sender;
    value = msg.value / 2;
    require((2 * value) == msg.value);
  }

  modifier condition(bool _condition) {
    require(_condition);
    _;
  }

  modifier onlyBuyer() {
    require(msg.sender == buyer);
    _;
  }

  modifier onlySeller() {
    require(msg.sender == seller);
    _;
  }

  modifier inState(State _state) {
    require(state == _state);
    _;
  }

  event Aborted();
  event PurchaseConfirmed();
  event ItemReceived();

  /// Aborta la compra y reclama el ether.
  /// Sólo puede ser llamado por el vendedor
  /// antes de que el contrato se cierre.
  function abort() public
  onlySeller
  inState(State.Created)
  {
    emit Aborted();
    state = State.Inactive;
    seller.transfer(seller.balance);
  }

  /// Confirma la compra por parte del comprador.
  /// La transacción debe incluir la cantidad de ether
  /// multiplicada por 2. El ether quedará bloqueado
  /// hasta que se llame a confirmReceived.
  function confirmPurchase() public
  inState(State.Created)
  condition(msg.value == (2 * value))
  payable
  {
    emit PurchaseConfirmed();
    buyer = msg.sender;
    state = State.Locked;
  }

  /// Confirma que tú (el comprador) has recibido el
  /// artículo. Esto desbloqueará el ether.
  function confirmReceived() public
  onlyBuyer
  inState(State.Locked)
  {
    emit ItemReceived();
    // Es importante que primero se cambie el estado
    // para evitar que los contratos a los que se llama
    // abajo mediante `send` puedan volver a ejecutar esto.
    state = State.Inactive;

    // NOTA: Esto permite bloquear los fondos tanto al comprador
    // como al vendedor - debe usarse el patrón withdraw.

    buyer.transfer(value);
    seller.transfer(seller.balance);
  }
}
