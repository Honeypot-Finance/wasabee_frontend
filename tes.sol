// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "./gen_schema.sol";
import "./gen_events.sol";
import "./gen_base.sol";
import "./gen_helpers.sol";

address constant FACTORY = 0xc906E2bA6AA4F6Dd8340487DD8CDeBcA65e56A8D;

interface IERC20 {
    function name() external view returns (string memory);
    function symbol() external view returns (string memory);
    function decimals() external view returns (uint8);
}

contract MyIndex is GhostGraph {
    using StringHelpers for EventDetails;
    using StringHelpers for uint256;
    using StringHelpers for address;

    function compareStrings(string memory a, string memory b) public pure returns (bool) {
        return keccak256(abi.encodePacked(a)) == keccak256(abi.encodePacked(b));
    }


    function tryGetName(address token) internal view returns (string memory) {
        try IERC20(token).name() returns (string memory tokenName) {
            return tokenName;
        } catch {
            return "Unknown";
        }
    }

    function tryGetSymbol(address token) internal view returns (string memory) {
        try IERC20(token).symbol() returns (string memory symbol) {
            return symbol;
        } catch {
            return "Unknown";
        }
    }

    function tryGetDecimals(address token) internal view returns (uint8) {
        try IERC20(token).decimals() returns (uint8 decimals) {
            return decimals;
        } catch {
            return uint8(18);
        }
    }

    function registerHandles() external {
        // ex: register thruster factory contract on Blast Mainnet
        // Uncomment these to register your contracts
        graph.registerFactory(FACTORY, GhostEventName.PairCreated, "token0");
        graph.registerFactory(FACTORY, GhostEventName.PairCreated, "token1");
        graph.registerHandle(FACTORY);
    }

    function onTransfer(EventDetails memory details, TransferEvent memory ev) external {
        if (details.emitter == FACTORY) {
            return;
        }
        Erc20 memory token = graph.getErc20(details.emitter);

        //if after swap from balance is 0, token.holder count --
        if (ev.from != address(0)) {
            tokenHolder memory holder = graph.gettokenHolder(
                string.concat(details.emitter.toString(),ev.from.toString())
            );

            holder.holdingValue -= ev.value;
            if(holder.holdingValue == 0){
                token.holderCount--;
            }

            graph.savetokenHolder(holder);
        }

        //if before swap to balance is 0, token.holder count ++
        if (ev.to != address(0)) {
            tokenHolder memory holder = graph.gettokenHolder(
                string.concat(details.emitter.toString(),ev.to.toString())
            );

            holder.holdingValue += ev.value;
            if(holder.holdingValue == ev.value){
                token.holderCount++;
            }

            graph.savetokenHolder(holder);
        }

        graph.saveErc20(token);
    }

    function onPairCreated(EventDetails memory details, PairCreatedEvent memory ev) external {
        Erc20 memory erc20Token0 = graph.getErc20(ev.token0);
        if (compareStrings(erc20Token0.name, "")) {
            erc20Token0.decimals = tryGetDecimals(ev.token0);
            erc20Token0.name = tryGetName(ev.token0);
            erc20Token0.symbol = tryGetSymbol(ev.token0);
            graph.saveErc20(erc20Token0);
        }

        Erc20 memory erc20Token1 = graph.getErc20(ev.token1);
        if (compareStrings(erc20Token1.name, "")) {
            erc20Token1.decimals = tryGetDecimals(ev.token1);
            erc20Token1.name = tryGetName(ev.token1);
            erc20Token1.symbol = tryGetSymbol(ev.token1);
            graph.saveErc20(erc20Token1);
        }
    }
}
